"use client"
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface EbookSection {
    title: string;
    subsections: string[];
}

function EbookGenerator() {
    const [loading, setLoading] = useState(false);
    const [ebookContent, setEbookContent] = useState('');

    const generateEbook = async () => {
        setLoading(true);
        setEbookContent('');

        const ebookStructure: EbookSection[] = [
            {
                title: 'Introduction',
                subsections: ['Welcome'],
            },
            {
                title: 'Understanding the Real Estate Market',
                subsections: ['Current Trends'],
            },
            // Add more sections and subsections as needed
        ];

        try {
            const response = await fetch('/api/generatebook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ebookStructure }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate ebook');
            }

            const data = await response.json();
            console.log("data", data)
            setEbookContent(data);
        } catch (error) {
            console.error(error);
            alert('An error occurred while generating the ebook.');
        } finally {
            setLoading(false);
        }
    };

    const markdown = `# Heading 1

  ## Heading 2

  ### Heading 3

  This is a paragraph with **bold text** and _italic text_.

  - List item 1
  - List item 2

* Lists
* [ ] todo
* [x] done
  `;

    return (
        <div>
            <button onClick={generateEbook} disabled={loading}>
                {loading ? 'Generating Ebook...' : 'Generate Ebook'}
            </button>
            {ebookContent && (
                <div>
                    <h2>Generated Ebook:</h2>
                    <ReactMarkdown>{ebookContent}</ReactMarkdown>

                </div>
            )}
            <ReactMarkdown>
                {markdown}
            </ReactMarkdown>
        </div>
    );
}

export default EbookGenerator;
