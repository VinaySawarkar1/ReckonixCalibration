import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Category {
  id: number;
  name: string;
  subcategories: (string | { id: number; name: string; categoryId?: number })[];
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    // Normalize subcategories to array of strings (names)
    return data.map((cat: any) => ({
      ...cat,
      subcategories: (cat.subcategories || []).map((sub: any) => typeof sub === 'string' ? sub : sub.name)
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoriesForSelect = (categories: Category[]) => {
  return categories.map(category => ({
    value: category.name,
    label: category.name
  }));
};

export const getSubcategoriesForSelect = (categories: Category[], selectedCategory: string) => {
  const category = categories.find(cat => cat.name === selectedCategory);
  if (!category) return [];
  
  return category.subcategories.map(subcategory => ({
    value: subcategory,
    label: subcategory
  }));
};
