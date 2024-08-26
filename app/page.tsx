'use client'

import { useState, useEffect } from 'react'
import Login from './components/Login'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { PlusCircleIcon, XCircleIcon } from 'lucide-react'
import { WrestlerData, SeasonRecord, PlacementData } from '../types/wrestler'
import WrestlerForm from './components/WrestlerForm'
import { useLoginState } from '@/hooks/useLoginState';

// Define the weight classes
const weightClasses = [
  '106 lbs', '113 lbs', '120 lbs', '126 lbs', '132 lbs', '138 lbs', '145 lbs',
  '152 lbs', '160 lbs', '170 lbs', '182 lbs', '195 lbs', '220 lbs', '285 lbs'
]

export default function Component() {
  // Destructure login state and functions from custom hook
  const { isLoggedIn, schoolName, login, logout } = useLoginState();

  // State to hold wrestler data for each weight class
  const [wrestlerData, setWrestlerData] = useState<Record<string, WrestlerData>>(
    Object.fromEntries(weightClasses.map(wc => [wc, { name: '', grade: 9, seasonRecords: [{ wins: '', losses: '' }], placements: [] }]))
  );

  // State to manage submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Fetch existing data when the user logs in or the school name changes
  useEffect(() => {
    if (isLoggedIn && schoolName) {
      fetchExistingData();
    }
  }, [isLoggedIn, schoolName]);

  // Function to fetch existing wrestler data from the server
  const fetchExistingData = async () => {
    try {
      const response = await fetch(`/api/get-wrestler-data?school=${encodeURIComponent(schoolName)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.wrestlerData) {
          setWrestlerData(data.wrestlerData);
        }
      }
    } catch (error) {
      console.error('Error fetching existing data:', error);
    }
  };

  // Handle changes to wrestler data
  const handleChange = (weightClass: string, field: keyof WrestlerData, value: any) => {
    setWrestlerData(prev => ({
      ...prev,
      [weightClass]: {
        ...prev[weightClass],
        [field]: value
      }
    }));
  };

  // Handle form submission to send wrestler data to the server
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch('/api/submit-wrestler-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schoolName, wrestlerData }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Success! Wrestler data has been submitted to the tournament director.', result);
        setSubmitStatus('success');
      } else {
        throw new Error(result.message || 'Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render login form if the user is not logged in
  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Login onLogin={login} />
      </div>
    );
  }

  // Render the main form for entering wrestler data
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wrestling Team Seeding Criteria</h1>
      <h2 className="text-xl mb-4">School: {schoolName}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {weightClasses.map(weightClass => (
          <WrestlerForm
            key={weightClass}
            weightClass={weightClass}
            data={wrestlerData[weightClass]}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button onClick={handleSubmit} isLoading={isSubmitting} disabled={isSubmitting}>
          Submit to Tournament Director
        </Button>
        {submitStatus === 'success' && (
          <p className="text-green-600 mt-2">Data submitted successfully!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-600 mt-2">Error submitting data. Please try again.</p>
        )}
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}