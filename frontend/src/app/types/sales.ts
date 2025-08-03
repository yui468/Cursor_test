export interface SalesListRequest {
  targetIndustry: string;
  targetKeywords: string[];
  companySize: string;
  maxProspects: number;
  newsSources: string[];
}

export interface CompanyInfo {
  companyName: string;
  industry: string;
  description: string;
  foundedYear: number;
  employeeCount: string;
  revenue: string;
  headquarters: string;
  website: string;
  mainProducts: string;
  recentNews: string;
  businessModel: string;
  targetMarket: string;
  competitiveAdvantage: string;
  growthPotential: string;
}

export interface Prospect {
  companyName: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  relevanceScore: number;
  reasoning: string;
  newsSource: string;
  companyInfo?: CompanyInfo;
}

export interface SalesListResponse {
  prospects: Prospect[];
  totalCount: number;
  generatedAt: string;
  summary: string;
}

export interface NewsArticle {
  title: string;
  content: string;
  url: string;
  publishedAt: string;
  source: string;
}