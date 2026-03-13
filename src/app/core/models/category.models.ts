export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  domain: string;
  fieldSchema: Record<string, unknown>;
  createdAt: string;
}
