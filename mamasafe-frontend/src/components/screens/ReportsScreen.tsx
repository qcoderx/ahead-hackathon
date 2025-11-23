import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, Share2, Search, Filter, Calendar } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Report {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  type: 'Interaction Check' | 'Medication Safety' | 'Visit Summary';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  summary: string;
}

interface ReportsScreenProps {
  onBack: () => void;
}

const ReportsScreen: React.FC<ReportsScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Load reports from localStorage (simulating backend fetch)
    const savedReports = JSON.parse(localStorage.getItem('mamasafe_reports') || '[]');
    // Add some mock data if empty
    if (savedReports.length === 0) {
      const mockReports: Report[] = [
        {
          id: 'R-1001',
          patientName: 'Jessica Alba',
          patientId: 'MS-837492',
          date: '2024-03-20',
          type: 'Medication Safety',
          riskLevel: 'High',
          summary: 'Contraindicated: Ibuprofen (3rd Trimester)'
        },
        {
          id: 'R-1002',
          patientName: 'Sarah Johnson',
          patientId: 'MS-1023',
          date: '2024-03-19',
          type: 'Interaction Check',
          riskLevel: 'Low',
          summary: 'Safe combination: Paracetamol + Amoxicillin'
        }
      ];
      setReports(mockReports);
    } else {
      setReports(savedReports);
    }
  }, []);

  const filteredReports = reports.filter(report => 
    report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Medical Reports</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{report.patientName}</h3>
                    <p className="text-xs text-gray-500">{report.patientId}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getRiskColor(report.riskLevel)}`}>
                    {report.riskLevel}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">{report.type}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded">
                  {report.summary}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {report.date}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Download className="w-3 h-3" /> PDF
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Share2 className="w-3 h-3" /> Share
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsScreen;
