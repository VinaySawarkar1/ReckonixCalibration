import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from '../../hooks/use-toast';
import { Category, fetchCategories } from '../../lib/utils';
import { Trash2, Edit, Plus, X } from 'lucide-react';

// Helper to normalize subcategories to objects recursively
function normalizeSubcategories(subs) {
  return (subs || []).map(sub => {
    if (typeof sub === 'string') return { name: sub, children: [] };
    return {
      name: sub.name,
      children: normalizeSubcategories(sub.children)
    };
  });
}

// Helper for tree editing with path arrays
function TreeEditor({ nodes, setNodes }) {
  // Helper to get node by path
  const getNodeByPath = (arr, path) => {
    let node = arr;
    for (let i = 0; i < path.length; i++) {
      node = node[path[i]].children;
    }
    return node;
  };
  // Set node name by path
  const setNameByPath = (arr, path, value) => {
    if (path.length === 1) {
      arr[path[0]].name = value;
    } else {
      setNameByPath(arr[path[0]].children, path.slice(1), value);
    }
  };
  // Add subcategory at path
  const addSubByPath = (arr, path) => {
    if (path.length === 0) {
      arr.push({ name: '', children: [] });
    } else {
      let node = arr[path[0]];
      if (!node.children) node.children = [];
      if (path.length === 1) {
        node.children.push({ name: '', children: [] });
      } else {
        addSubByPath(node.children, path.slice(1));
      }
    }
  };
  // Delete node at path
  const deleteByPath = (arr, path) => {
    if (path.length === 1) {
      arr.splice(path[0], 1);
    } else {
      deleteByPath(arr[path[0]].children, path.slice(1));
    }
  };
  // Render tree recursively
  const renderTree = (arr, path = []) => (
    <ul className="ml-4">
      {arr.map((node, idx) => (
        <li key={idx} className="mb-2">
          <input
            className="border px-2 py-1 rounded mr-2"
            value={node.name}
            onChange={e => {
              const updated = JSON.parse(JSON.stringify(nodes));
              setNameByPath(updated, [...path, idx], e.target.value);
              setNodes(updated);
            }}
            placeholder="Subcategory name"
          />
          <button type="button" className="ml-1 text-xs text-red-500" onClick={() => {
            const updated = JSON.parse(JSON.stringify(nodes));
            deleteByPath(updated, [...path, idx]);
            setNodes(updated);
          }}>
            Delete
          </button>
          <button type="button" className="ml-1 text-xs text-green-600" onClick={() => {
            const updated = JSON.parse(JSON.stringify(nodes));
            addSubByPath(updated, [...path, idx]);
            setNodes(updated);
          }}>
            + Sub
          </button>
          {node.children && node.children.length > 0 && renderTree(node.children, [...path, idx])}
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      {renderTree(nodes)}
      <button type="button" className="mt-2 px-2 py-1 bg-blue-100 rounded" onClick={() => {
        const updated = JSON.parse(JSON.stringify(nodes));
        addSubByPath(updated, []);
        setNodes(updated);
      }}>
        + Add Subcategory
      </button>
    </div>
  );
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [treeSubcategories, setTreeSubcategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      // Normalize all subcategories to objects
      setCategories(data.map(cat => ({ ...cat, subcategories: normalizeSubcategories(cat.subcategories) })));
    } catch (error) {
      toast({ title: "Error", description: "Failed to load categories", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory.id}`
        : '/api/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: formData.name.trim(), subcategories: treeSubcategories }),
      });

      if (!response.ok) {
        throw new Error('Failed to save category');
      }

      toast({
        title: "Success",
        description: editingCategory 
          ? "Category updated successfully" 
          : "Category created successfully",
      });

      setIsDialogOpen(false);
      setEditingCategory(null);
      setFormData({ name: '' });
      setTreeSubcategories([]);
      loadCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category? This will affect all products in this category.')) {
      return;
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      toast({
        title: "Success",
        description: "Category deleted successfully",
      });

      loadCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
    setTreeSubcategories(normalizeSubcategories(category.subcategories));
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '' });
    setTreeSubcategories([]);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading categories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white rounded">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div>
                <Label>Subcategories (tree)</Label>
                <TreeEditor nodes={treeSubcategories} setNodes={setTreeSubcategories} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Subcategories:</Label>
                <div className="flex flex-wrap gap-1">
                  {category.subcategories.map((subcategory, index) => (
                    <Badge key={typeof subcategory === 'string' ? subcategory : subcategory.id || index} variant="secondary">
                      {typeof subcategory === 'string' ? subcategory : subcategory.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No categories found. Create your first category to get started.</p>
        </div>
      )}
    </div>
  );
} 