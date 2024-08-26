'use client'

import { useState, useEffect } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface School {
  "School Name": string;
}

interface LoginProps {
  onLogin: (school: string, password: string) => Promise<boolean>;
}

export default function Login({ onLogin }: LoginProps) {
  const [schools, setSchools] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/get-schools');
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const data = await response.json();
        setSchools(data.map((school: any) => school['School Name']).sort());
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    }

    fetchSchools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSchool && password) {
      const success = await onLogin(selectedSchool, password);
      if (!success) {
        // Handle login failure (e.g., show an error message)
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div>
            <Select onValueChange={(value) => setSelectedSchool(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your school" />
              </SelectTrigger>
              <SelectContent>
                {schools.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}