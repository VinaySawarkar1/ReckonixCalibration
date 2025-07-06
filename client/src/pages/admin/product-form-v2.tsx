import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fetchCategories, Category as CategoryType } from "@/lib/utils";

// Remove hardcoded subcategories. Use dynamic fetch.

export default function ProductFormV2({
  initialData = {},
  onSubmit,
  loading = false,
  mode = "add"
}: {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
  mode?: "add" | "edit";
}) {
  const [name, setName] = useState(initialData.name || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [subcategory, setSubcategory] = useState(initialData.subcategory || "");
  const [shortDescription, setShortDescription] = useState(initialData.shortDescription || "");
  const [fullTechnicalInfo, setFullTechnicalInfo] = useState(initialData.fullTechnicalInfo || "");
  const [specifications, setSpecifications] = useState(initialData.specifications || [{ key: "", value: "" }]);
  const [featuresBenefits, setFeaturesBenefits] = useState(initialData.featuresBenefits || [""]);
  const [applications, setApplications] = useState(initialData.applications || [""]);
  const [certifications, setCertifications] = useState(initialData.certifications || [""]);
  const [technicalDetails, setTechnicalDetails] = useState(initialData.technicalDetails || {
    dimensions: "",
    weight: "",
    powerRequirements: "",
    operatingConditions: "",
    warranty: ""
  });
  const [datasheetPdfUrl, setDatasheetPdfUrl] = useState(initialData.datasheetPdfUrl || "");
  const [catalogPdfUrl, setCatalogPdfUrl] = useState(initialData.catalogPdfUrl || "");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [homeFeatured, setHomeFeatured] = useState(initialData.homeFeatured || false);
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  React.useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  }

  function handleAddSpec() {
    setSpecifications([...specifications, { key: "", value: "" }]);
  }
  function handleRemoveSpec(idx: number) {
    setSpecifications(specifications.filter((_: any, i: number) => i !== idx));
  }
  function handleSpecChange(idx: number, field: "key" | "value", value: string) {
    const updated = [...specifications];
    updated[idx][field] = value;
    setSpecifications(updated);
  }

  function handleAddFeature() {
    setFeaturesBenefits([...featuresBenefits, ""]);
  }
  function handleRemoveFeature(idx: number) {
    setFeaturesBenefits(featuresBenefits.filter((_: any, i: number) => i !== idx));
  }
  function handleFeatureChange(idx: number, value: string) {
    const updated = [...featuresBenefits];
    updated[idx] = value;
    setFeaturesBenefits(updated);
  }

  function handleAddApplication() {
    setApplications([...applications, ""]);
  }
  function handleRemoveApplication(idx: number) {
    setApplications(applications.filter((_: any, i: number) => i !== idx));
  }
  function handleApplicationChange(idx: number, value: string) {
    const updated = [...applications];
    updated[idx] = value;
    setApplications(updated);
  }

  function handleAddCertification() {
    setCertifications([...certifications, ""]);
  }
  function handleRemoveCertification(idx: number) {
    setCertifications(certifications.filter((_: any, i: number) => i !== idx));
  }
  function handleCertificationChange(idx: number, value: string) {
    const updated = [...certifications];
    updated[idx] = value;
    setCertifications(updated);
  }

  function handleTechnicalDetailChange(field: string, value: string) {
    setTechnicalDetails({ ...technicalDetails, [field]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      name,
      category,
      subcategory,
      shortDescription,
      fullTechnicalInfo,
      specifications,
      featuresBenefits,
      applications,
      certifications,
      technicalDetails,
      datasheetPdfUrl,
      catalogPdfUrl,
      images: imageFiles,
      homeFeatured,
    };
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="Enter product name" />
        </div>
        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            id="homeFeatured"
            checked={homeFeatured}
            onChange={e => setHomeFeatured(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="homeFeatured" className="text-sm">Show on Home Page</label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select value={category} onValueChange={value => { setCategory(value); setSubcategory(""); }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subcategory</label>
          <Select value={subcategory} onValueChange={setSubcategory} disabled={!category}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(categories.find(cat => cat.name === category)?.subcategories || []).map((subcat) => (
                <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea value={shortDescription} onChange={e => setShortDescription(e.target.value)} placeholder="Brief product description" rows={3} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Full Technical Information</label>
        <Textarea value={fullTechnicalInfo} onChange={e => setFullTechnicalInfo(e.target.value)} placeholder="Detailed technical information" rows={4} />
      </div>
      {/* Specifications */}
      <div>
        <label className="block text-sm font-medium mb-2">Technical Specifications</label>
        {specifications.map((spec: { key: string; value: string }, idx: number) => (
          <div key={idx} className="flex gap-2 mb-2">
            <Input value={spec.key} onChange={e => handleSpecChange(idx, "key", e.target.value)} placeholder="Parameter" />
            <Input value={spec.value} onChange={e => handleSpecChange(idx, "value", e.target.value)} placeholder="Specification" />
            <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveSpec(idx)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={handleAddSpec}>Add Specification</Button>
      </div>
      {/* Features & Benefits */}
      <div>
        <label className="block text-sm font-medium mb-2">Features & Benefits</label>
        {featuresBenefits.map((feature: string, idx: number) => (
          <div key={idx} className="flex gap-2 mb-2">
            <Input value={feature} onChange={e => handleFeatureChange(idx, e.target.value)} placeholder="Feature or Benefit" />
            <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveFeature(idx)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>Add Feature</Button>
      </div>
      {/* Applications */}
      <div>
        <label className="block text-sm font-medium mb-2">Applications</label>
        {applications.map((app: string, idx: number) => (
          <div key={idx} className="flex gap-2 mb-2">
            <Input value={app} onChange={e => handleApplicationChange(idx, e.target.value)} placeholder="Application" />
            <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveApplication(idx)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={handleAddApplication}>Add Application</Button>
      </div>
      {/* Certifications */}
      <div>
        <label className="block text-sm font-medium mb-2">Certifications</label>
        {certifications.map((cert: string, idx: number) => (
          <div key={idx} className="flex gap-2 mb-2">
            <Input value={cert} onChange={e => handleCertificationChange(idx, e.target.value)} placeholder="Certification" />
            <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveCertification(idx)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={handleAddCertification}>Add Certification</Button>
      </div>
      {/* Technical Details */}
      <div>
        <label className="block text-sm font-medium mb-2">Technical Details</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input value={technicalDetails.dimensions} onChange={e => handleTechnicalDetailChange("dimensions", e.target.value)} placeholder="Dimensions" />
          <Input value={technicalDetails.weight} onChange={e => handleTechnicalDetailChange("weight", e.target.value)} placeholder="Weight" />
          <Input value={technicalDetails.powerRequirements} onChange={e => handleTechnicalDetailChange("powerRequirements", e.target.value)} placeholder="Power Requirements" />
          <Input value={technicalDetails.operatingConditions} onChange={e => handleTechnicalDetailChange("operatingConditions", e.target.value)} placeholder="Operating Conditions" />
          <Input value={technicalDetails.warranty} onChange={e => handleTechnicalDetailChange("warranty", e.target.value)} placeholder="Warranty" />
        </div>
      </div>
      {/* Datasheet PDF URL */}
      <div>
        <label className="block text-sm font-medium mb-2">Datasheet PDF URL</label>
        <Input value={datasheetPdfUrl} onChange={e => setDatasheetPdfUrl(e.target.value)} placeholder="https://example.com/datasheet.pdf" />
      </div>
      {/* Catalog PDF URL */}
      <div>
        <label className="block text-sm font-medium mb-2">Catalog PDF URL</label>
        <Input value={catalogPdfUrl} onChange={e => setCatalogPdfUrl(e.target.value)} placeholder="https://example.com/catalog.pdf" />
      </div>
      {/* Product Images (Multiple) */}
      <div>
        <label className="block text-sm font-medium mb-2">Product Images (Multiple)</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <div className="flex gap-2 mt-2 flex-wrap">
          {imagePreviews.map((img, idx) => (
            <img key={idx} src={img} alt="Preview" className="w-20 h-20 object-cover rounded border" />
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-6">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
          {mode === "edit" ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
} 