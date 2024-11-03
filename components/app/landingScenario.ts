import { starResponse } from "@/types/entities";

export const scenario: starResponse = {
  shortName: "analyzing_analytics_decisions",
  probableQuestions: [
    "Tell me about a time when you had to make a difficult decision at work.",
    "Describe a situation where you had to persuade a colleague to change their approach.",
    "Give an example of a time when you had to prioritize conflicting objectives.",
    "Can you talk about a project where you had to balance the needs of different stakeholders?",
    "Tell me about a time when you had to handle a disagreement with a colleague.",
  ],
  starAnswer: {
    situation:
      "In my previous role at Microsoft Research healthcare, we were preparing to launch a mobile app with analytics capabilities. The team had differing opinions on the best approach to take regarding the analytics software. I wanted to use tested and proven analytics software like Microsoft Insights, while my colleague, Kevin, wanted to build his own analytics system to retain raw data for a longer duration. Our user researchers needed only aggregated data analytics to understand user behavior, so I believed using Microsoft Insights would save us time and still fulfill our requirements. I felt frustrated with the delays on the project caused by this disagreement.",
    task: "To resolve this issue, I decided to collaborate with Kevin and present our concerns and requirements to a user researcher. I thought it would be beneficial to have an objective third party understand the benefits of using Microsoft Insights. It was important for me to show Kevin that our decision would not compromise the data we needed, and it would also save us time in developing a custom analytics system.",
    action:
      "First, I scheduled a meeting with Kevin and the user researcher to discuss our conflicting opinions. I made sure to provide detailed information about the benefits and capabilities of Microsoft Insights, emphasizing how it could meet our requirements for aggregated data analytics.During the meeting, I encouraged open and honest discussion, allowing Kevin to express his concerns and reasoning behind wanting to build a custom analytics system. I actively listened to his points, showing empathy and acknowledging the value in his perspective.Next, I presented our user researcher with concrete examples of how using Microsoft Insights would ultimately be more efficient and effective. I shared success stories from other projects where similar analytics software had yielded valuable insights and saved time for the team.To demonstrate the benefits in a tangible way, I worked with the user researcher to create a mock-up dashboard using Microsoft Insights. We showcased its intuitive interface and how it could provide the required analytics for user behavior analysis.Throughout the process, I maintained a collaborative mindset, seeking input and feedback from both Kevin and the user researcher. I ensured that their concerns and preferences were considered in the final decision.Ultimately, our user researcher recognized the advantages of using Microsoft Insights, and together we convinced Kevin that it was the most efficient and suitable option for our project. With everyone aligned, we were able to move forward with the implementation and successfully launch the mobile app with analytics capabilities.",
    result:
      "As a result of my proactive approach and effective collaboration, we were able to save valuable time and resources by using Microsoft Insights for analytics instead of building a custom system. The aggregated data analytics provided by Microsoft Insights met our requirements, and our user researchers were able to gain valuable insights into user behavior. The decision also fostered a positive working relationship with Kevin, as he appreciated the opportunity to voice his ideas and concerns during the process. Overall, the project was a success, and we achieved our goals in a timely manner.",
  },
  critique: [
    "The candidate demonstrated excellent interpersonal and persuasive skills by effectively handling a disagreement with a colleague. However, the frustration mentioned at the beginning of the scenario could indicate a negative behavioral trait, such as impatience or difficulty managing stress. It would be beneficial for the candidate to address this aspect when reflecting on their experience.",
  ],
  followUpQuestions: [
    "How did you handle your own frustration during the situation?",
    "How did you ensure that the benefits of Microsoft Insights were clearly communicated to Kevin?",
    "Did you face any resistance from other team members during the adoption of Microsoft Insights?",
    "How did you maintain a positive working relationship with Kevin after the disagreement?",
    "Can you discuss a time when you had to compromise on your own preferences for the greater good of the project?",
  ],
  embellishInput: [
    "To further enhance the impact of the scenario, the candidate can mention specific challenges they faced during the meeting with Kevin, such as dealing with emotional resistance or managing conflicting opinions from other team members. This would demonstrate their ability to handle complex situations and navigate through different perspectives.",
    "Additionally, the candidate can include specific metrics or data points to showcase the effectiveness of Microsoft Insights and how it positively impacted the project outcomes. This would strengthen their argument and demonstrate their analytical thinking skills.",
    "Finally, the candidate can mention any follow-up actions they took after the meeting with Kevin, such as documenting the agreed-upon decisions or providing additional support to ensure a smooth transition to using Microsoft Insights. This would showcase their attention to detail and commitment to successful implementation.",
  ],
  tags: [
    "conflict resolution",
    "persuasion",
    "decision-making",
    "collaboration",
    "interpersonal skills",
  ],
};

export default scenario;
