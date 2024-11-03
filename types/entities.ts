export type starResponse = {
  shortName: string;
  probableQuestions: string[];
  starAnswer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  critique?: string[];
  followUpQuestions?: string[];
  embellishInput?: string[];
  tags?: string[];
};
