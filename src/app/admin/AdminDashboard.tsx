"use client";

import { useState, useEffect } from "react";
import { PortfolioData } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

const inputClass = "w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none";

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<keyof PortfolioData>("hero");

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((d) => {
        // Ensure customSections exists
        if (!d.customSections) d.customSections = [];
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage("Saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const err = await res.json();
        setMessage(`Error: ${err.error || 'Failed to save'}`);
      }
    } catch (e) {
      setMessage("Error saving data.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !data) return <div className="p-8 text-slate-700">Loading data...</div>;

  const tabs: (keyof PortfolioData)[] = ["hero", "about", "experience", "projects", "skills", "education", "certifications", "customSections"];

  const updateArrayItem = (field: keyof PortfolioData, index: number, key: string, value: any) => {
    const newData = { ...data };
    (newData[field] as any)[index][key] = value;
    setData(newData);
  };

  const addArrayItem = (field: keyof PortfolioData, defaultItem: any) => {
    const newData = { ...data };
    (newData[field] as any).push({ id: Date.now().toString(), ...defaultItem });
    setData(newData);
  };

  const removeArrayItem = (field: keyof PortfolioData, index: number) => {
    const newData = { ...data };
    (newData[field] as any).splice(index, 1);
    setData(newData);
  };

  const tabLabels: Record<string, string> = {
    hero: "Hero",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    certifications: "Certifications",
    customSections: "Custom Sections",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar Tabs */}
      <div className="md:col-span-1 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === tab 
                ? "bg-blue-600 text-white" 
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tabLabels[tab] || tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 capitalize">{tabLabels[activeTab]} Settings</h2>
          <div className="flex items-center space-x-4">
            {message && <span className={`text-sm font-medium ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>{message}</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === "hero" && (
            <div className="space-y-4">
              {Object.keys(data.hero).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {key === "pitch" ? (
                    <textarea
                      value={(data.hero as any)[key]}
                      onChange={(e) => setData({ ...data, hero: { ...data.hero, [key]: e.target.value } })}
                      className={inputClass}
                      rows={3}
                    />
                  ) : (
                    <input
                      type="text"
                      value={(data.hero as any)[key]}
                      onChange={(e) => setData({ ...data, hero: { ...data.hero, [key]: e.target.value } })}
                      className={inputClass}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Summary</label>
              <textarea
                value={data.about.summary}
                onChange={(e) => setData({ ...data, about: { ...data.about, summary: e.target.value } })}
                className={inputClass}
                rows={10}
              />
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={exp.id} className="p-5 border border-slate-200 rounded-xl relative bg-slate-50">
                  <button onClick={() => removeArrayItem("experience", i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  <div className="grid grid-cols-2 gap-4 mb-4 pr-8">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Role</label>
                      <input type="text" value={exp.role} onChange={(e) => updateArrayItem("experience", i, "role", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Company</label>
                      <input type="text" value={exp.company} onChange={(e) => updateArrayItem("experience", i, "company", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Duration</label>
                      <input type="text" value={exp.duration} onChange={(e) => updateArrayItem("experience", i, "duration", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Description (one bullet per line)</label>
                    <textarea 
                      value={exp.description.join("\n")} 
                      onChange={(e) => updateArrayItem("experience", i, "description", e.target.value.split("\n"))}
                      className={inputClass} rows={4}
                    />
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem("experience", { role: "", company: "", duration: "", description: [] })} className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Plus className="w-4 h-4 mr-1"/> Add Experience
              </button>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              {data.projects.map((proj, i) => (
                <div key={proj.id} className="p-5 border border-slate-200 rounded-xl relative bg-slate-50">
                  <button onClick={() => removeArrayItem("projects", i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  <div className="grid grid-cols-2 gap-4 mb-4 pr-8">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                      <input type="text" value={proj.title} onChange={(e) => updateArrayItem("projects", i, "title", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Timeline</label>
                      <input type="text" value={proj.timeline} onChange={(e) => updateArrayItem("projects", i, "timeline", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Link (optional)</label>
                      <input type="text" value={proj.link || ""} onChange={(e) => updateArrayItem("projects", i, "link", e.target.value)} className={inputClass} />
                    </div>
                    <div className="flex items-center mt-6">
                      <input type="checkbox" checked={proj.isFeatured} onChange={(e) => updateArrayItem("projects", i, "isFeatured", e.target.checked)} className="mr-2 w-4 h-4" />
                      <label className="text-sm font-medium text-slate-700">Featured Project</label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                    <textarea value={proj.description} onChange={(e) => updateArrayItem("projects", i, "description", e.target.value)} className={inputClass} rows={2}/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Bullets (one per line)</label>
                    <textarea 
                      value={proj.bullets.join("\n")} 
                      onChange={(e) => updateArrayItem("projects", i, "bullets", e.target.value.split("\n"))}
                      className={inputClass} rows={4}
                    />
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem("projects", { title: "", timeline: "", description: "", bullets: [], isFeatured: false })} className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Plus className="w-4 h-4 mr-1"/> Add Project
              </button>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="space-y-6">
              {data.skills.map((cat, i) => (
                <div key={cat.id} className="p-5 border border-slate-200 rounded-xl relative bg-slate-50">
                  <button onClick={() => removeArrayItem("skills", i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  <div className="mb-4 pr-8">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Category Name</label>
                    <input type="text" value={cat.name} onChange={(e) => updateArrayItem("skills", i, "name", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Skills (comma separated)</label>
                    <input type="text" value={cat.skills.join(", ")} onChange={(e) => updateArrayItem("skills", i, "skills", e.target.value.split(",").map(s => s.trim()))} className={inputClass} />
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem("skills", { name: "", skills: [] })} className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Plus className="w-4 h-4 mr-1"/> Add Skill Category
              </button>
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={edu.id} className="p-5 border border-slate-200 rounded-xl relative bg-slate-50">
                  <button onClick={() => removeArrayItem("education", i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Degree</label>
                      <input type="text" value={edu.degree} onChange={(e) => updateArrayItem("education", i, "degree", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Institution</label>
                      <input type="text" value={edu.institution} onChange={(e) => updateArrayItem("education", i, "institution", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Duration</label>
                      <input type="text" value={edu.duration} onChange={(e) => updateArrayItem("education", i, "duration", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Score</label>
                      <input type="text" value={edu.score} onChange={(e) => updateArrayItem("education", i, "score", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem("education", { degree: "", institution: "", duration: "", score: "" })} className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Plus className="w-4 h-4 mr-1"/> Add Education
              </button>
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="space-y-6">
              {data.certifications.map((cert, i) => (
                <div key={cert.id} className="p-5 border border-slate-200 rounded-xl relative bg-slate-50">
                  <button onClick={() => removeArrayItem("certifications", i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  <div className="grid grid-cols-2 gap-4 pr-8">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                      <input type="text" value={cert.name} onChange={(e) => updateArrayItem("certifications", i, "name", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Issuer</label>
                      <input type="text" value={cert.issuer} onChange={(e) => updateArrayItem("certifications", i, "issuer", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Year</label>
                      <input type="text" value={cert.year} onChange={(e) => updateArrayItem("certifications", i, "year", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem("certifications", { name: "", issuer: "", year: "" })} className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Plus className="w-4 h-4 mr-1"/> Add Certification
              </button>
            </div>
          )}

          {activeTab === "customSections" && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-700 text-sm">
                <strong>Custom Sections</strong> — Add any new section to your portfolio without touching code. Each section will appear on your site with its own heading and content.
              </div>
              {data.customSections.map((section, i) => (
                <div key={section.id} className="p-5 border border-slate-200 rounded-xl relative bg-slate-50">
                  <button onClick={() => removeArrayItem("customSections", i)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5"/></button>
                  <div className="mb-4 pr-8">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Section Title</label>
                    <input type="text" value={section.title} onChange={(e) => updateArrayItem("customSections", i, "title", e.target.value)} className={inputClass} placeholder="e.g. Volunteering, Publications, Awards" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Content (use new lines for bullet points)</label>
                    <textarea 
                      value={section.content} 
                      onChange={(e) => updateArrayItem("customSections", i, "content", e.target.value)}
                      className={inputClass} rows={6}
                      placeholder="Write your content here. Each new line will be shown as a separate paragraph or bullet point."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Display Order</label>
                    <input type="number" value={section.order} onChange={(e) => updateArrayItem("customSections", i, "order", parseInt(e.target.value) || 0)} className={inputClass + " w-32"} />
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem("customSections", { title: "", content: "", order: data.customSections.length })} className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Plus className="w-4 h-4 mr-1"/> Add Custom Section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
