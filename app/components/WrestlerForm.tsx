import React from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { PlusCircleIcon, XCircleIcon } from 'lucide-react'
import { WrestlerData, SeasonRecord, PlacementData } from '@/types/wrestler'

// Define the weight classes
const weightClasses = [
  '106 lbs', '113 lbs', '120 lbs', '126 lbs', '132 lbs', '138 lbs', '145 lbs',
  '152 lbs', '160 lbs', '170 lbs', '182 lbs', '195 lbs', '220 lbs', '285 lbs'
]

// Component for a single wrestler's form
const WrestlerForm = ({ weightClass, data, onChange }) => {
  // Handle changes to the grade field
  const handleGradeChange = (grade: string) => {
    const gradeNum = parseInt(grade)
    const maxSeasons = 4 // Maximum number of high school seasons
    const seasonCount = Math.min(gradeNum - 8, maxSeasons) // Limit to 4 seasons max
    const newSeasonRecords = Array(seasonCount).fill({ wins: '', losses: '' }).reverse()
    onChange(weightClass, 'grade', gradeNum)
    onChange(weightClass, 'seasonRecords', newSeasonRecords)
  }

  // Handle changes to the season records
  const handleRecordChange = (index: number, field: 'wins' | 'losses', value: string) => {
    const numericValue = value.replace(/\D/g, ''); // Ensure only numeric values
    const newRecords = [...data.seasonRecords];
    newRecords[index] = { ...newRecords[index], [field]: numericValue };
    onChange(weightClass, 'seasonRecords', newRecords);
  }

  // Add a new placement entry
  const addPlacement = () => {
    const newPlacement: PlacementData = {
      tournament: "",
      year: "",
      place: "",
    };
    onChange(weightClass, 'placements', [...data.placements, newPlacement]);
  }

  // Update an existing placement entry
  const updatePlacement = (index: number, field: keyof PlacementData, value: string) => {
    const newPlacements = [...data.placements];
    newPlacements[index] = { ...newPlacements[index], [field]: value };
    if (field === 'tournament' && value !== 'Other') {
      delete newPlacements[index].customTournament; // Remove custom tournament field if not 'Other'
    }
    onChange(weightClass, 'placements', newPlacements);
  }

  // Remove a placement entry
  const removePlacement = (index: number) => {
    const newPlacements = data.placements.filter((_, i) => i !== index)
    onChange(weightClass, 'placements', newPlacements)
  }

  // Get the label for the season based on the index
  const getSeasonLabel = (index: number, totalSeasons: number) => {
    const currentYear = new Date().getFullYear()
    switch (totalSeasons - index) {
      case 1: return "Current Season"
      case 2: return `Previous Season (${currentYear-1}-${currentYear})`
      default: return `${currentYear - totalSeasons + index}-${currentYear - totalSeasons + index + 1}`
    }
  }

  // Define the list of tournaments, years, and places
  const tournaments = [
    "States", "Regionals", "Districts", "Beast of the East", 
    "Ironman", "Super 32", "Fargo", "NHSCA Nationals", "Other"
  ];

  const years = Array.from({ length: 5 }, (_, i) => (2024 - i).toString());
  const places = ["1", "2", "3", "4", "5", "6", "7", "8", "Qualifier"];

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{weightClass}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          {/* Name input field */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={`name-${weightClass}`}>Name</Label>
            <Input
              id={`name-${weightClass}`}
              value={data.name}
              onChange={(e) => onChange(weightClass, 'name', e.target.value)}
              placeholder="Enter wrestler name"
              className="text-black bg-white"
            />
          </div>
          {/* Grade selection field */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={`grade-${weightClass}`}>Grade</Label>
            <Select onValueChange={handleGradeChange} value={data.grade.toString()}>
              <SelectTrigger id={`grade-${weightClass}`}>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                {[9, 10, 11, 12].map((grade) => (
                  <SelectItem key={grade} value={grade.toString()}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Season records input fields */}
          {data.seasonRecords.map((record, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Label className="w-40">{getSeasonLabel(data.seasonRecords.length - index - 1, data.seasonRecords.length)}</Label>
              <Input
                type="text"
                value={record.wins}
                onChange={(e) => handleRecordChange(index, 'wins', e.target.value)}
                placeholder="Wins"
                className="w-20 text-black bg-white"
              />
              <Input
                type="text"
                value={record.losses}
                onChange={(e) => handleRecordChange(index, 'losses', e.target.value)}
                placeholder="Losses"
                className="w-20 text-black bg-white"
              />
            </div>
          ))}
          {/* Placements input fields */}
          <div className="flex flex-col space-y-1.5">
            <Label>Placements</Label>
            {data.placements.map((placement: PlacementData, index: number) => (
              <div key={index} className="flex flex-col space-y-2 mb-4">
                <Select
                  value={placement.tournament}
                  onValueChange={(value) => updatePlacement(index, 'tournament', value)}
                >
                  <SelectTrigger id={`tournament-${weightClass}-${index}`} className="w-full">
                    <SelectValue placeholder="Select tournament" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
                    {tournaments.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {placement.tournament === 'Other' && (
                  <Input
                    value={placement.customTournament || ''}
                    onChange={(e) => updatePlacement(index, 'customTournament', e.target.value)}
                    placeholder="Tournament Name"
                    className="text-black bg-white w-full"
                  />
                )}
                <div className="flex space-x-2">
                  <Select
                    value={placement.year}
                    onValueChange={(value) => updatePlacement(index, 'year', value)}
                  >
                    <SelectTrigger id={`year-${weightClass}-${index}`} className="w-1/2">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={placement.place}
                    onValueChange={(value) => updatePlacement(index, 'place', value)}
                  >
                    <SelectTrigger id={`place-${weightClass}-${index}`} className="w-1/2">
                      <SelectValue placeholder="Place" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      {places.map((place) => (
                        <SelectItem key={place} value={place}>{place}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePlacement(index)}
                  className="self-end"
                >
                  <XCircleIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addPlacement}
              className="mt-2"
            >
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Add Placement
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WrestlerForm