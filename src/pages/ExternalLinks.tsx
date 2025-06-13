
import { Link, ExternalLink, Calendar, User } from "lucide-react";

const ExternalLinks = () => {
  const externalLinks = [
    {
      id: 1,
      title: "OAuth 2.0 Security Best Practices",
      url: "https://tools.ietf.org/html/rfc6749",
      description: "Official RFC 6749 specification for OAuth 2.0 framework",
      category: "Documentation",
      addedBy: "Sarah Chen",
      addedDate: "2024-06-10",
      domain: "tools.ietf.org"
    },
    {
      id: 2,
      title: "Google OAuth 2.0 Guide",
      url: "https://developers.google.com/identity/protocols/oauth2",
      description: "Google's comprehensive guide to implementing OAuth 2.0",
      category: "Integration Guide",
      addedBy: "Alex Rodriguez",
      addedDate: "2024-06-11",
      domain: "developers.google.com"
    },
    {
      id: 3,
      title: "GitHub OAuth Apps Documentation",
      url: "https://docs.github.com/en/developers/apps/oauth-apps",
      description: "GitHub's documentation for creating OAuth applications",
      category: "Integration Guide",
      addedBy: "Alex Rodriguez",
      addedDate: "2024-06-11",
      domain: "docs.github.com"
    },
    {
      id: 4,
      title: "Microsoft Identity Platform",
      url: "https://docs.microsoft.com/en-us/azure/active-directory/develop/",
      description: "Microsoft's identity platform and OAuth implementation",
      category: "Integration Guide",
      addedBy: "Maria Garcia",
      addedDate: "2024-06-12",
      domain: "docs.microsoft.com"
    },
    {
      id: 5,
      title: "OWASP Authentication Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
      description: "Security best practices for authentication systems",
      category: "Security",
      addedBy: "Maria Garcia",
      addedDate: "2024-06-12",
      domain: "owasp.org"
    },
    {
      id: 6,
      title: "JWT Best Practices",
      url: "https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/",
      description: "Best practices for JSON Web Token implementation",
      category: "Security",
      addedBy: "David Kim",
      addedDate: "2024-06-12",
      domain: "auth0.com"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Documentation":
        return "bg-blue-100 text-blue-800";
      case "Integration Guide":
        return "bg-green-100 text-green-800";
      case "Security":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">External Links</h1>
          <p className="text-slate-600">References and resources for the authentication system project</p>
        </div>

        <div className="mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Link className="w-4 h-4" />
            Add New Link
          </button>
        </div>

        <div className="grid gap-4">
          {externalLinks.map((link) => (
            <div key={link.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900 text-lg">{link.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(link.category)}`}>
                      {link.category}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-3">{link.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="text-blue-600 font-medium">{link.domain}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>Added by {link.addedBy}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{link.addedDate}</span>
                    </div>
                  </div>
                  
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    Visit Link
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExternalLinks;
