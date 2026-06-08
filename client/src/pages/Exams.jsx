/**
 * Exams Page
 * Exam and results management
 */

import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DataTable from '../components/DataTable';
import Loader from '../components/Loader';
import examService from '../services/examService';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('exams'); // 'exams' or 'results'

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (view === 'exams') {
        const response = await examService.getExams();
        setExams(response.data);
      } else {
        const response = await examService.getResults();
        setResults(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const examColumns = [
    { key: 'name', label: 'Exam Name' },
    { key: 'class', label: 'Class' },
    { key: 'subject', label: 'Subject' },
    { key: 'totalMarks', label: 'Total Marks' }
  ];

  const resultColumns = [
    { key: 'studentId', label: 'Student' },
    { key: 'examId', label: 'Exam' },
    { key: 'marksObtained', label: 'Marks' },
    { key: 'grade', label: 'Grade' }
  ];

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold text-dark mb-6">Exams & Results</h1>
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('exams')}
            className={`${view === 'exams' ? 'btn-primary' : 'btn-outline'}`}
          >
            Exams
          </button>
          <button
            onClick={() => setView('results')}
            className={`${view === 'results' ? 'btn-primary' : 'btn-outline'}`}
          >
            Results
          </button>
        </div>
        <div className="card">
          {view === 'exams' ? (
            <DataTable columns={examColumns} data={exams} loading={loading} />
          ) : (
            <DataTable columns={resultColumns} data={results} loading={loading} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Exams;