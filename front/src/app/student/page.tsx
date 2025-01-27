'use client';

import { useState, useEffect } from 'react';
import { BarChart, Clock, Award } from 'lucide-react';
import { useAccount } from 'wagmi';
import { CertificateCard } from '../../components/CertificateCard';
import { ActivityChart } from '../../components/charts/ActivityChart';
import { useContract } from '../../hooks/useContract';

export default function StudentDashboard() {
  const { isConnected, address } = useAccount();
  const { contract } = useContract();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalHours: 0,
    averageGrade: 0,
    certificatesCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!isConnected || !contract) return;
      
      try {
        // Dans une vraie application, nous aurions un moyen de lier l'adresse à l'ID étudiant
        const studentId = BigInt(1); // Pour l'exemple
        const certificateIds = await contract.read.getStudentCertificates([studentId]);
        
        const certsData = await Promise.all(
          certificateIds.map(id => contract.read.getCertificateData([id]))
        );

        setCertificates(certsData);
        
        // Calcul des statistiques
        const validCerts = certsData.filter(cert => cert.isValid);
        const grades = validCerts.map(cert => parseInt(cert.grade));
        setStats({
          totalHours: validCerts.length * 35, // Exemple: 35h par certificat
          averageGrade: grades.reduce((a, b) => a + b, 0) / grades.length,
          certificatesCount: validCerts.length
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isConnected, contract, address]);

  if (!isConnected) {
    return (
      <div className="flex-1 p-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <Award className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Connect your wallet to view your certificates
          </h2>
          <p className="text-gray-600">
            Access your academic achievements and track your progress
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
        <p className="text-gray-600">Track your academic progress and achievements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Learning Hours</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-semibold">{stats.totalHours}h</p>
          <p className="text-sm text-gray-500">Total learning time</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Average Grade</h3>
            <Award className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-semibold">{stats.averageGrade.toFixed(1)}/20</p>
          <p className="text-sm text-gray-500">Across all certificates</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm">Certificates</h3>
            <BarChart className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-semibold">{stats.certificatesCount}</p>
          <p className="text-sm text-gray-500">Valid certificates</p>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold mb-4">Learning Activity</h3>
        <div className="h-64">
          <ActivityChart data={certificates} />
        </div>
      </div>

      {/* Certificates Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <CertificateCard key={index} certificate={cert} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No certificates found.
        </div>
      )}
    </div>
  );
}
