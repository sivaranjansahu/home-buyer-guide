// pages/api/generateEbook.ts

import { NextApiRequest, NextApiResponse } from 'next';
//import OpenAI from 'openai';
import OpenAI from 'openai';


import pLimit from 'p-limit';

// Initialize OpenAI API
const openAiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? '',
});

// Type definitions for the ebook structure
interface EbookSection {
    title: string;
    subsections: string[];
}

interface EbookContentItem {
    title: string;
    content?: string;
    isSection: boolean;
}

// Function to generate content for a given prompt
async function generateContent(prompt: string) {
    try {
        const response = await openAiClient.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 1500, // Adjust as needed
            temperature: 0.7,
        });
        return response?.choices[0]?.message?.content?.trim();
    } catch (error) {
        console.error('Error generating content:', error);
        return '';
    }
}
export const config = {
    maxDuration: 60,
};

// API Route Handler
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const { ebookStructure } = req.body;

    if (!ebookStructure) {
        res.status(400).json({ error: 'Ebook structure is required' });
        return;
    }

    try {
        const ebookContent = await generateEbook(ebookStructure);
        // Return the generated ebook content
        res.status(200).json({ ebookContent });
    } catch (error) {
        console.error('Error generating ebook:', error);
        res.status(500).json({ error: 'Error generating ebook' });
    }
}

// The generateEbook function adapted for Next.js
export async function generateEbook(
    ebookStructure: EbookSection[]
): Promise<string> {
    let ebookContent = '# Your Ebook Title\n\n';

    // Generate Table of Contents
    let toc = '## Table of Contents\n\n';

    // Prepare tasks for parallel execution
    const tasks: Promise<{
        sectionTitle: string;
        subsectionTitle: string;
        content: string;
    }>[] = [];
    const limit = pLimit(3); // Limit the number of concurrent API calls to 3

    for (const section of ebookStructure) {
        ebookContent += `## ${section.title}\n\n`;
        toc += `- [${section.title}](#${section.title
            .toLowerCase()
            .replace(/\s+/g, '-')})\n`;

        for (const subsection of section.subsections) {
            ebookContent += `### ${subsection}\n\n`;
            toc += `  - [${subsection}](#${subsection
                .toLowerCase()
                .replace(/\s+/g, '-')})\n`;

            const prompt = `Write a detailed section about "${subsection}" for an ebook section titled "${section.title}". Make sure it's informative and engaging.`;

            // Create a task for each content generation
            const task = limit(async () => {
                const content = await generateContent(prompt);
                // Placeholder image
                // const imageMarkdown = `![Placeholder image for ${subsection}](https://via.placeholder.com/800x400?text=${encodeURIComponent(
                //     subsection
                // )})\n\n`;
                return {
                    sectionTitle: section.title,
                    subsectionTitle: subsection,
                    content: content + '\n\n',
                };
            });

            tasks.push(task);
        }
    }

    // Wait for all tasks to complete
    const results = await Promise.all(tasks);

    // Sort results to maintain the original order
    const orderedResults: EbookContentItem[] = [];
    ebookStructure.forEach((section) => {
        orderedResults.push({ title: section.title, isSection: true });
        section.subsections.forEach((subsection) => {
            const result = results.find(
                (r) =>
                    r.sectionTitle === section.title &&
                    r.subsectionTitle === subsection
            );
            if (result) {
                orderedResults.push({
                    title: subsection,
                    content: result.content,
                    isSection: false,
                });
            }
        });
    });

    // Assemble the ebook content
    ebookContent += toc + '\n\n';

    orderedResults.forEach((item) => {
        if (item.isSection) {
            // It's a section title
            ebookContent += `## ${item.title}\n\n`;
        } else {
            // It's a subsection content
            ebookContent += `### ${item.title}\n\n`;
            ebookContent += item.content;
        }
    });

    return ebookContent;
}
