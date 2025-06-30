
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Package, 
  FileText, 
  MessageSquare, 
  Users,
  Eye,
  Plus,
  Download,
  LogOut,
  Edit,
  Trash2,
  Search,
  X
} from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Calibration Systems" as const,
    shortDescription: "",
    fullTechnicalInfo: "",
    specifications: [{ key: "", value: "" }],
    featuresBenefits: [""],
    applications: [""],
    certifications: [""],
    imageUrl: "",
    imageGallery: [],
    catalogPdfUrl: "",
    datasheetPdfUrl: "",
    technicalDetails: {
      dimensions: "",
      weight: "",
      powerRequirements: "",
      operatingConditions: "",
      warranty: "",
      compliance: []
    }
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      setLocation("/admin/login");
    }
  }, [user, setLocation]);

  // Fetch data
  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  const { data: quotes = [] } = useQuery({
    queryKey: ["/api/quotes"],
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["/api/messages"],
  });

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics/website-views"],
  });

  const { data: productViews = [] } = useQuery({
    queryKey: ["/api/analytics/product-views"],
  });

  // Export functionality
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({
        title: "No Data",
        description: "No data available to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (typeof value === 'object' && value !== null) {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportQuotes = () => {
    const exportData = quotes.map(quote => ({
      id: quote.id,
      customerName: quote.customerName,
      customerEmail: quote.customerEmail,
      customerPhone: quote.customerPhone,
      customerLocation: quote.customerLocation || '',
      productsCount: quote.products.length,
      productNames: quote.products.map(p => p.name).join('; '),
      message: quote.message || '',
      status: quote.status,
      createdAt: new Date(quote.createdAt).toLocaleDateString()
    }));
    exportToCSV(exportData, 'quotes');
  };

  const exportMessages = () => {
    const exportData = messages.map(message => ({
      id: message.id,
      name: message.name,
      email: message.email,
      phone: message.phone || '',
      message: message.message,
      replied: message.replied ? 'Yes' : 'No',
      createdAt: new Date(message.createdAt).toLocaleDateString()
    }));
    exportToCSV(exportData, 'messages');
  };

  // Update quote status mutation
  const updateQuoteStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiRequest("PUT", `/api/quotes/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      toast({
        title: "Quote Updated",
        description: "Quote status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update quote status.",
        variant: "destructive",
      });
    }
  });

  // Mark message as replied mutation
  const markMessageReplied = useMutation({
    mutationFn: ({ id, replied }: { id: number; replied: boolean }) =>
      apiRequest("PUT", `/api/messages/${id}/replied`, { replied }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Message Updated",
        description: "Message status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update message status.",
        variant: "destructive",
      });
    }
  });

  // Create product mutation
  const createProduct = useMutation({
    mutationFn: (productData: any) => apiRequest("POST", "/api/products", productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setShowAddProductDialog(false);
      resetProductForm();
      toast({
        title: "Product Created",
        description: "Product has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create product.",
        variant: "destructive",
      });
    }
  });

  // Update product mutation
  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      apiRequest("PUT", `/api/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setEditingProduct(null);
      toast({
        title: "Product Updated",
        description: "Product has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      });
    }
  });

  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    }
  });

  const resetProductForm = () => {
    setNewProduct({
      name: "",
      category: "Calibration Systems",
      shortDescription: "",
      fullTechnicalInfo: "",
      specifications: [{ key: "", value: "" }],
      featuresBenefits: [""],
      applications: [""],
      certifications: [""],
      imageUrl: "",
      imageGallery: [],
      catalogPdfUrl: "",
      datasheetPdfUrl: "",
      technicalDetails: {
        dimensions: "",
        weight: "",
        powerRequirements: "",
        operatingConditions: "",
        warranty: "",
        compliance: []
      }
    });
  };

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addSpecification = (isEditing = false) => {
    if (isEditing && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        specifications: [...editingProduct.specifications, { key: "", value: "" }]
      });
    } else {
      setNewProduct({
        ...newProduct,
        specifications: [...newProduct.specifications, { key: "", value: "" }]
      });
    }
  };

  const removeSpecification = (index: number, isEditing = false) => {
    if (isEditing && editingProduct) {
      const specs = editingProduct.specifications.filter((_, i) => i !== index);
      setEditingProduct({ ...editingProduct, specifications: specs });
    } else {
      const specs = newProduct.specifications.filter((_, i) => i !== index);
      setNewProduct({ ...newProduct, specifications: specs });
    }
  };

  const addFeature = (isEditing = false) => {
    if (isEditing && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        featuresBenefits: [...editingProduct.featuresBenefits, ""]
      });
    } else {
      setNewProduct({
        ...newProduct,
        featuresBenefits: [...newProduct.featuresBenefits, ""]
      });
    }
  };

  const removeFeature = (index: number, isEditing = false) => {
    if (isEditing && editingProduct) {
      const features = editingProduct.featuresBenefits.filter((_, i) => i !== index);
      setEditingProduct({ ...editingProduct, featuresBenefits: features });
    } else {
      const features = newProduct.featuresBenefits.filter((_, i) => i !== index);
      setNewProduct({ ...newProduct, featuresBenefits: features });
    }
  };

  const addApplication = (isEditing = false) => {
    if (isEditing && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        applications: [...editingProduct.applications, ""]
      });
    } else {
      setNewProduct({
        ...newProduct,
        applications: [...newProduct.applications, ""]
      });
    }
  };

  const removeApplication = (index: number, isEditing = false) => {
    if (isEditing && editingProduct) {
      const apps = editingProduct.applications.filter((_, i) => i !== index);
      setEditingProduct({ ...editingProduct, applications: apps });
    } else {
      const apps = newProduct.applications.filter((_, i) => i !== index);
      setNewProduct({ ...newProduct, applications: apps });
    }
  };

  const addCertification = (isEditing = false) => {
    if (isEditing && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        certifications: [...editingProduct.certifications, ""]
      });
    } else {
      setNewProduct({
        ...newProduct,
        certifications: [...newProduct.certifications, ""]
      });
    }
  };

  const removeCertification = (index: number, isEditing = false) => {
    if (isEditing && editingProduct) {
      const certs = editingProduct.certifications.filter((_, i) => i !== index);
      setEditingProduct({ ...editingProduct, certifications: certs });
    } else {
      const certs = newProduct.certifications.filter((_, i) => i !== index);
      setNewProduct({ ...newProduct, certifications: certs });
    }
  };

  const handleAddProduct = () => {
    const productData = {
      ...newProduct,
      specifications: newProduct.specifications.filter(s => s.key && s.value),
      featuresBenefits: newProduct.featuresBenefits.filter(f => f.trim()),
      applications: newProduct.applications.filter(a => a.trim()),
      certifications: newProduct.certifications.filter(c => c.trim()),
      catalogPdfUrl: newProduct.catalogPdfUrl || "",
      datasheetPdfUrl: newProduct.datasheetPdfUrl || "",
      technicalDetails: newProduct.technicalDetails || {
        dimensions: "",
        weight: "",
        powerRequirements: "",
        operatingConditions: "",
        warranty: "",
        compliance: []
      }
    };
    createProduct.mutate(productData);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = () => {
    if (editingProduct) {
      const productData = {
        ...editingProduct,
        specifications: editingProduct.specifications.filter((s: any) => s.key && s.value),
        featuresBenefits: editingProduct.featuresBenefits.filter((f: string) => f.trim()),
        applications: editingProduct.applications.filter((a: string) => a.trim()),
        certifications: editingProduct.certifications.filter((c: string) => c.trim()),
        catalogPdfUrl: editingProduct.catalogPdfUrl || "",
        datasheetPdfUrl: editingProduct.datasheetPdfUrl || "",
        technicalDetails: editingProduct.technicalDetails || {
          dimensions: "",
          weight: "",
          powerRequirements: "",
          operatingConditions: "",
          warranty: "",
          compliance: []
        }
      };
      updateProduct.mutate({ id: editingProduct.id, data: productData });
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate(id);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const newQuotes = quotes.filter(q => q.status === "New").length;
  const newMessages = messages.filter(m => !m.replied).length;

  const ProductForm = ({ product, isEditing = false }: { product: any; isEditing?: boolean }) => (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <Input
            value={product.name}
            onChange={(e) => {
              if (isEditing) {
                setEditingProduct({ ...product, name: e.target.value });
              } else {
                setNewProduct({ ...product, name: e.target.value });
              }
            }}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select 
            value={product.category} 
            onValueChange={(value: any) => {
              if (isEditing) {
                setEditingProduct({ ...product, category: value });
              } else {
                setNewProduct({ ...product, category: value });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Calibration Systems">Calibration Systems</SelectItem>
              <SelectItem value="Testing Systems">Testing Systems</SelectItem>
              <SelectItem value="Measuring Instruments">Measuring Instruments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={product.shortDescription}
          onChange={(e) => {
            if (isEditing) {
              setEditingProduct({ ...product, shortDescription: e.target.value });
            } else {
              setNewProduct({ ...product, shortDescription: e.target.value });
            }
          }}
          placeholder="Brief product description"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Full Technical Information</label>
        <Textarea
          value={product.fullTechnicalInfo}
          onChange={(e) => {
            if (isEditing) {
              setEditingProduct({ ...product, fullTechnicalInfo: e.target.value });
            } else {
              setNewProduct({ ...product, fullTechnicalInfo: e.target.value });
            }
          }}
          placeholder="Detailed technical information"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Technical Specifications</label>
        {product.specifications.map((spec: any, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              placeholder="Parameter"
              value={spec.key}
              onChange={(e) => {
                const specs = [...product.specifications];
                specs[index] = { ...specs[index], key: e.target.value };
                if (isEditing) {
                  setEditingProduct({ ...product, specifications: specs });
                } else {
                  setNewProduct({ ...product, specifications: specs });
                }
              }}
            />
            <Input
              placeholder="Value"
              value={spec.value}
              onChange={(e) => {
                const specs = [...product.specifications];
                specs[index] = { ...specs[index], value: e.target.value };
                if (isEditing) {
                  setEditingProduct({ ...product, specifications: specs });
                } else {
                  setNewProduct({ ...product, specifications: specs });
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeSpecification(index, isEditing)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addSpecification(isEditing)}
        >
          Add Specification
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Features & Benefits</label>
        {product.featuresBenefits.map((feature: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              placeholder="Feature or benefit"
              value={feature}
              onChange={(e) => {
                const features = [...product.featuresBenefits];
                features[index] = e.target.value;
                if (isEditing) {
                  setEditingProduct({ ...product, featuresBenefits: features });
                } else {
                  setNewProduct({ ...product, featuresBenefits: features });
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeFeature(index, isEditing)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addFeature(isEditing)}
        >
          Add Feature
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Applications</label>
        {product.applications.map((app: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              placeholder="Application area"
              value={app}
              onChange={(e) => {
                const apps = [...product.applications];
                apps[index] = e.target.value;
                if (isEditing) {
                  setEditingProduct({ ...product, applications: apps });
                } else {
                  setNewProduct({ ...product, applications: apps });
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeApplication(index, isEditing)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addApplication(isEditing)}
        >
          Add Application
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Certifications</label>
        {product.certifications.map((cert: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              placeholder="Certification"
              value={cert}
              onChange={(e) => {
                const certs = [...product.certifications];
                certs[index] = e.target.value;
                if (isEditing) {
                  setEditingProduct({ ...product, certifications: certs });
                } else {
                  setNewProduct({ ...product, certifications: certs });
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeCertification(index, isEditing)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addCertification(isEditing)}
        >
          Add Certification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            value={product.imageUrl}
            onChange={(e) => {
              if (isEditing) {
                setEditingProduct({ ...product, imageUrl: e.target.value });
              } else {
                setNewProduct({ ...product, imageUrl: e.target.value });
              }
            }}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Datasheet PDF URL</label>
          <Input
            value={product.datasheetPdfUrl}
            onChange={(e) => {
              if (isEditing) {
                setEditingProduct({ ...product, datasheetPdfUrl: e.target.value });
              } else {
                setNewProduct({ ...product, datasheetPdfUrl: e.target.value });
              }
            }}
            placeholder="https://example.com/datasheet.pdf"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Technical Details</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Dimensions"
            value={product.technicalDetails?.dimensions || ""}
            onChange={(e) => {
              const details = { ...product.technicalDetails, dimensions: e.target.value };
              if (isEditing) {
                setEditingProduct({ ...product, technicalDetails: details });
              } else {
                setNewProduct({ ...product, technicalDetails: details });
              }
            }}
          />
          <Input
            placeholder="Weight"
            value={product.technicalDetails?.weight || ""}
            onChange={(e) => {
              const details = { ...product.technicalDetails, weight: e.target.value };
              if (isEditing) {
                setEditingProduct({ ...product, technicalDetails: details });
              } else {
                setNewProduct({ ...product, technicalDetails: details });
              }
            }}
          />
          <Input
            placeholder="Power Requirements"
            value={product.technicalDetails?.powerRequirements || ""}
            onChange={(e) => {
              const details = { ...product.technicalDetails, powerRequirements: e.target.value };
              if (isEditing) {
                setEditingProduct({ ...product, technicalDetails: details });
              } else {
                setNewProduct({ ...product, technicalDetails: details });
              }
            }}
          />
          <Input
            placeholder="Operating Conditions"
            value={product.technicalDetails?.operatingConditions || ""}
            onChange={(e) => {
              const details = { ...product.technicalDetails, operatingConditions: e.target.value };
              if (isEditing) {
                setEditingProduct({ ...product, technicalDetails: details });
              } else {
                setNewProduct({ ...product, technicalDetails: details });
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="font-cinzel text-xl font-bold text-maroon-500">RECKONIX Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.username}</span>
              <Button variant="ghost" onClick={handleLogout} className="text-gray-500 hover:text-maroon-500">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2 relative">
              <FileText className="h-4 w-4" />
              Quotes
              {newQuotes > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 px-1 py-0 text-xs">
                  {newQuotes}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 relative">
              <MessageSquare className="h-4 w-4" />
              Messages
              {newMessages > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 px-1 py-0 text-xs">
                  {newMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Catalog
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 mr-4">
                      <Package className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                      <p className="text-gray-600 text-sm">Total Products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 mr-4">
                      <FileText className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
                      <p className="text-gray-600 text-sm">Quote Requests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 mr-4">
                      <MessageSquare className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                      <p className="text-gray-600 text-sm">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-maroon-100 mr-4">
                      <Eye className="h-6 w-6 text-maroon-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{analytics?.totalViews || 0}</p>
                      <p className="text-gray-600 text-sm">Website Views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes.slice(0, 5).map((quote) => (
                    <div key={quote.id} className="flex items-start border-b pb-4 last:border-b-0">
                      <div className="w-2 h-2 bg-maroon-500 rounded-full mt-2 mr-3"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          New quote request from {quote.customerName}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowAddProductDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Calibration Systems">Calibration Systems</SelectItem>
                      <SelectItem value="Testing Systems">Testing Systems</SelectItem>
                      <SelectItem value="Measuring Instruments">Measuring Instruments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-lg object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                  {product.shortDescription}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{product.category}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.views}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No products found matching your criteria.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add Product Dialog */}
            {showAddProductDialog && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Add Product</h3>
                    <Button
                      variant="ghost"
                      onClick={() => setShowAddProductDialog(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <ProductForm product={newProduct} />
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setShowAddProductDialog(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddProduct}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!newProduct.name || !newProduct.shortDescription || !newProduct.imageUrl}
                    >
                      Add Product
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Product Dialog */}
            {editingProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Edit Product</h3>
                    <Button
                      variant="ghost"
                      onClick={() => setEditingProduct(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <ProductForm product={editingProduct} isEditing={true} />
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setEditingProduct(null)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleUpdateProduct}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Update Product
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quote Requests</h2>
              <Button 
                onClick={exportQuotes}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {quotes.map((quote) => (
                        <tr key={quote.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{quote.customerName}</div>
                              <div className="text-sm text-gray-500">{quote.customerEmail}</div>
                              <div className="text-sm text-gray-500">{quote.customerPhone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{quote.products.length} products</div>
                            <div className="text-sm text-gray-500">
                              {quote.products.map(p => p.name).join(", ").substring(0, 50)}...
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(quote.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Select
                              value={quote.status}
                              onValueChange={(status) => updateQuoteStatus.mutate({ id: quote.id, status })}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="New">New</SelectItem>
                                <SelectItem value="Contacted">Contacted</SelectItem>
                                <SelectItem value="Closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-maroon-600 hover:text-maroon-900">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
              <Button 
                onClick={exportMessages}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Messages
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {messages.map((message) => (
                        <tr key={message.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{message.name}</div>
                              <div className="text-sm text-gray-500">{message.email}</div>
                              {message.phone && (
                                <div className="text-sm text-gray-500">{message.phone}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {message.message}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={message.replied ? "default" : "secondary"}>
                              {message.replied ? "Replied" : "New"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markMessageReplied.mutate({ id: message.id, replied: !message.replied })}
                              className="text-maroon-600 hover:text-maroon-900"
                            >
                              {message.replied ? "Mark Unread" : "Mark Replied"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Catalog Tab */}
          <TabsContent value="catalog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Catalog Management</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Main Product Catalog</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Catalog Title</label>
                  <Input placeholder="Main Product Catalog 2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input placeholder="Complete product specifications and details" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PDF URL</label>
                  <Input placeholder="https://example.com/catalog.pdf" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update Catalog
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Website Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-maroon-500 mb-2">
                    {analytics?.totalViews || 0}
                  </div>
                  <p className="text-gray-600">Total website views</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Viewed Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {productViews.slice(0, 5).map((product) => (
                      <div key={product.productId} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700 truncate">{product.productName}</span>
                        <Badge variant="outline">{product.views} views</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
