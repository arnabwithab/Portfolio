import { WorkExperience } from '../types';

export const experiences: WorkExperience[] = [
  {
    id: "4",
    position: "Intern, Enterprise AI Platform",
    company: "Fidelity International",
    location: "Gurgaon",
    startDate: "2026-06",
    endDate: "Present",
    description: "Cut PII redaction latency by 92% via AWQ-quantized fine-tuning of Gemma 4 on SageMaker, reaching 96% F1. Shipped a document-sensitivity guardrail for the internal AI gateway, monitoring 15k+ uploads/month via ELK.",
    achievements: [
      "Cut PII redaction latency by 92% and achieved 96% F1 as measured on production holdout, by AWQ-quantizing and fine-tuning Gemma 4 on SageMaker",
      "Monitored 15k+ document uploads/month for sensitivity as measured by gateway traffic, by shipping a document-sensitivity guardrail with ELK observability into the internal AI gateway",
      "Cut manual audit effort by 40% and redaction costs by 85% as measured by ops spend, by automating redaction and review workflows"
    ],
    technologies: [],
    type: "internship"
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
      "Reduced inference latency by 35% and vRAM usage by 40% as measured by p95 and peak GPU memory, by migrating PyTorch pipelines to TensorRT + Triton Inference Server",
      "Increased inference throughput by 2.5x as measured by concurrent requests/sec, by implementing dynamic batching and KV-cache optimizations",
      "Enabled multimodal interactive narratives as measured by support for audio + image inputs, by extending RAG-Toolkit with pluggable LLM backends"
    ],
    technologies: [],
    type: "internship"
  },
  {
    id: "2",
    position: "AI Intern",
    company: "Critical AI Pvt Ltd",
    location: "Remote",
    startDate: "2025-06",
    endDate: "2025-07",
    description: "Built a modular, GPU-accelerated Retrieval-Augmented Generation system with FastAPI backend and Streamlit frontend. Integrated llama-cpp-python LLMs with custom embeddings for interactive narrative generation.",
    achievements: [
      "Shipped GPU-accelerated RAG-Toolkit enabling audio/image-based interactive narratives as measured by end-to-end demo readiness, by building modular FastAPI + Streamlit architecture",
      "Supported 5+ LLM backends with zero code changes as measured by plug-and-play model swaps, by designing pluggable llama-cpp-python embedding and inference interfaces",
      "Cut retrieval query latency by ~50% as measured by p50 response time, by optimizing custom embeddings and GPU inference"
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
      "Enabled real-time drone identification and tracking at 30+ FPS as measured by live video benchmarks, by building YOLOv8 detection + multi-object tracking pipeline",
      "Reduced operational report drafting time by 70% as measured by analyst workflow, by creating LangChain/LangGraph chatbot with NL-to-SQL over maritime databases",
      "Unlocked natural-language querying for non-technical operators as measured by adoption across reporting workflows, by implementing schema-aware natural language query engine"
    ],
    technologies: [],
    type: "internship"
  },
];
