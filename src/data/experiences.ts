import { WorkExperience } from '../types';

export const experiences: WorkExperience[] = [
  {
    id: "4",
    position: "Intern, Enterprise AI Platform",
    company: "Fidelity International",
    location: "Gurgaon",
    startDate: "2026-06",
    endDate: "2026-07",
    description: "Cut PII redaction latency by 92% via AWQ-quantized fine-tuning of Gemma 4 on SageMaker, reaching 96% F1. Shipped a document-sensitivity guardrail for the internal AI gateway, monitoring 15k+ uploads/month via ELK.",
    achievements: [
      "Fine-tuned models for PII redaction",
      "Built sensitivity guardrails for LiteLLM"
    ],
    technologies: [],
    type: "internship"
  },
  {
    id: "5",
    position: "Freelance AI Engineer",
    company: "VBC Healthcare Client",
    startDate: "2026-02",
    endDate: "2026-04",
    description: "Deployed a multi-agent Text2SQL service on AWS.",
    achievements: [
      "Deployed a multi-agent Text2SQL service on AWS"
    ],
    technologies: [],
    type: "contract"
  },
  {
    id: "3",
    position: "AI Engineer Intern",
    company: "DeepLure AI Research",
    location: "Remote",
    startDate: "2025-12",
    endDate: "2026-01",
    description: "Optimizing vRAM usage for inference model pipelines. Currently, migrating existing systems from a PyTorch backend to TensorRT and Triton Inference Server for improved performance and reduced latency.",
    achievements: [
      "Migrated inference stack from native PyTorch to TensorRT + Triton"
    ],
    technologies: [],
    type: "internship"
  },
  {
    id: "2",
    position: "Founding AI Intern",
    company: "Critical AI Pvt Ltd",
    location: "Remote",
    startDate: "2025-06",
    endDate: "2025-07",
    description: "Built a modular, GPU-accelerated Retrieval-Augmented Generation system with FastAPI backend and Streamlit frontend. Integrated llama-cpp-python LLMs with custom embeddings for interactive narrative generation.",
    achievements: [
      "Shipped RAG agents for clients towards early AI adoption"
    ],
    technologies: [],
    type: "internship"
  },
  {
    id: "1",
    position: "AI Intern",
    company: "WESEE, Ministry of Defence",
    location: "India",
    startDate: "2025-06",
    endDate: "2025-07",
    description: "Developed AI systems for military applications including drone identification, tracking pipelines, and natural language report generation systems for maritime operations.",
    achievements: [
      "Built MCP servers for internal chatbot towards early, security-first AI adoption"
    ],
    technologies: [],
    type: "internship"
  },
];
