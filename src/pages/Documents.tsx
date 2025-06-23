
import { FileText, Download, Eye, Calendar } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

const Documents = () => {
  const { t } = useTranslation();
  
  const documents = [
    {
      id: 1,
      name: "Authentication System Requirements.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "Sarah Chen",
      uploadedDate: "2024-06-10",
      status: "Current"
    },
    {
      id: 2,
      name: "OAuth Integration Guide.docx",
      type: "DOCX",
      size: "1.8 MB",
      uploadedBy: "Alex Rodriguez",
      uploadedDate: "2024-06-11",
      status: "Draft"
    },
    {
      id: 3,
      name: "Security Best Practices.pdf",
      type: "PDF",
      size: "3.2 MB",
      uploadedBy: "Maria Garcia",
      uploadedDate: "2024-06-12",
      status: "Review"
    },
    {
      id: 4,
      name: "API Documentation.md",
      type: "MD",
      size: "156 KB",
      uploadedBy: "David Kim",
      uploadedDate: "2024-06-12",
      status: "Current"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('documents.title')}</h1>
          <p className="text-slate-600">{t('documents.viewAndManage')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{t('documents.projectFiles')}</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {t('documents.uploadDocument')}
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{doc.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{t('documents.uploadedBy')} {doc.uploadedBy}</span>
                        <span>•</span>
                        <span>{doc.uploadedDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
