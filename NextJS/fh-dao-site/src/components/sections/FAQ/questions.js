import Answer1 from "./answers/answer1";
import Answer2 from "./answers/answer2";
import Answer3 from "./answers/answer3";
import Answer4 from "./answers/answer4";
import Answer5 from "./answers/answer5";
import Answer6 from "./answers/answer6";

const questions = [
  {
    question: "What is the utility of the token?",
    answer: <Answer1 />,
  },
  {
    question: "How can I invest?",
    answer: <Answer2 />,
  },
  {
    question: "How else can I get involved?",
    answer: <Answer3 />,
  },
  {
    question: "But doesn’t Blockchain contribute to climate change?",
    answer: <Answer4 />,
  },
  {
    question: "Why 8 million species?",
    answer: <Answer5 />,
  },
  {
    question: "All other questions",
    answer: <Answer6 />,
  },
];
export default questions;
