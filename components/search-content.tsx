'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, User, Building2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const runtime = 'edge';
////111111
// Define types for the API request and response
interface PersonQuery {
  queries: {
    match: {
      schema: "Person"
      properties: {
        name?: string[]
        nationality?: string[]
        idNumber?: string[]   
      }
    }
  }
}

interface CompanyQuery {
  queries: {
    match: {
      schema: "Company"
      properties: {
        name?: string[]
        jurisdiction?: string[]
      }
    }
  }
}

interface Result {
  id: string
  caption: string
  schema: string
  properties: {
    [key: string]: string[]
  }
  datasets: string[]
  referents: any[]
  target: boolean
  first_seen: string
  last_seen: string
  last_change: string
  score: number
  features: {
    [key: string]: number
  }
  match: boolean
}

interface MatchResponse {
  status: number
  results: Result[]
}

interface ApiResponse {
  responses: {
    match: MatchResponse
  }
  timestamp: string
  requestBody: PersonQuery | CompanyQuery
}

const ResultCard: React.FC<{ result: Result }> = ({ result }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Function to render property key in a readable format
  const formatKey = (key: string) => {
    // Convert camelCase or snake_case to Title Case
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize first letter of each word
  }

  return (
    <Card className="mb-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      <CardHeader>
        <CardTitle>{result.caption}</CardTitle>
        <CardDescription>{result.schema}</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>Nationality:</strong> {result.properties.nationality?.[0] || 'N/A'}</p>
        <p><strong>Position:</strong> {result.properties.position?.[0] || 'N/A'}</p>
        <p><strong>Score:</strong> {result.score}</p>
        <p><strong>First Seen:</strong> {new Date(result.first_seen).toLocaleString()}</p>
        <p><strong>Last Seen:</strong> {new Date(result.last_seen).toLocaleString()}</p>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2"
            >
              {Object.entries(result.properties).map(([key, values]) => (
                <p key={key}>
                  <strong>{formatKey(key)}:</strong> {Array.isArray(values) ? values.join(', ') : values}
                </p>
              ))}
              {/* Display additional fields outside properties if needed */}
              <p><strong>Datasets:</strong> {result.datasets.join(', ') || 'N/A'}</p>
              <p><strong>Target:</strong> {result.target ? 'Yes' : 'No'}</p>
              <p><strong>Last Change:</strong> {new Date(result.last_change).toLocaleString()}</p>
              <p><strong>Features:</strong></p>
              <ul className="list-disc list-inside">
                {Object.entries(result.features).map(([feature, value]) => (
                  <li key={feature}><strong>{formatKey(feature)}:</strong> {value}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export function SearchContent() {
  const [searchType, setSearchType] = useState<'person' | 'company'>('person')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<ApiResponse | null>(null)

  // Form states
  const [personForm, setPersonForm] = useState({
    name: '',
    nationality: '',
    idNumber: ''
  })
  const [companyForm, setCompanyForm] = useState({
    name: '',
    jurisdiction: ''
  })

  const createRequestBody = (): PersonQuery | CompanyQuery => {
    if (searchType === 'person') {
      const properties: PersonQuery["queries"]["match"]["properties"] = {}
      if (personForm.name.trim()) {
        properties.name = [personForm.name.trim()]
      }
      if (personForm.nationality.trim()) {
        properties.nationality = [personForm.nationality.trim()]
      }
      if (personForm.idNumber.trim()) {
        properties.idNumber = [personForm.idNumber.trim()] // Removed parseInt
      }
      return {
        queries: {
          match: {
            schema: "Person",
            properties
          }
        }
      }
    } else {
      const properties: CompanyQuery["queries"]["match"]["properties"] = {}
      if (companyForm.name.trim()) {
        properties.name = [companyForm.name.trim()]
      }
      if (companyForm.jurisdiction.trim()) {
        properties.jurisdiction = [companyForm.jurisdiction.trim()]
      }
      return {
        queries: {
          match: {
            schema: "Company",
            properties
          }
        }
      }
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const requestBody = createRequestBody()
    console.log('Request Body:', requestBody)

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!res.ok) {
        const errorData = await res.text()
        throw new Error(`Error ${res.status}: ${errorData}`)
      }

      const data = await res.json()
      setResponse({
        responses: data.responses,
        timestamp: new Date().toISOString(),
        requestBody
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = () => {
    if (searchType === 'person') {
      return personForm.name.trim() || personForm.nationality.trim() || personForm.idNumber.trim()
    } else {
      return companyForm.name.trim() || companyForm.jurisdiction.trim()
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Entity</CardTitle>
          <CardDescription>
            Search for persons or companies in our database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={searchType} onValueChange={(v) => setSearchType(v as 'person' | 'company')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="person" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Person
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company
              </TabsTrigger>
            </TabsList>

            <TabsContent value="person">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personName">Full Name</Label>
                  <Input
                    id="personName"
                    placeholder="e.g., Oscar Javier Gonzalez Vargas"
                    value={personForm.name}
                    onChange={(e) => setPersonForm({ ...personForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="e.g., Colombia"
                    value={personForm.nationality}
                    onChange={(e) => setPersonForm({ ...personForm, nationality: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    type="text" // Changed to text
                    placeholder="e.g., 123456"
                    value={personForm.idNumber}
                    onChange={(e) => setPersonForm({ ...personForm, idNumber: e.target.value })}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !isFormValid()}
                  className="w-full"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Searching...' : 'Search Person'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="company">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., Gazprom"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    placeholder="e.g., Russia"
                    value={companyForm.jurisdiction}
                    onChange={(e) => setCompanyForm({ ...companyForm, jurisdiction: e.target.value })}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !isFormValid()}
                  className="w-full"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Searching...' : 'Search Company'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      
        {response && response.responses?.match?.results?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                    Results
                  </CardTitle>
                  <span className="text-sm text-gray-500">
                    {new Date(response.timestamp).toLocaleString()}
                  </span>
                </div>
                <CardDescription>
                  Displaying {response.responses.match.results.length} result(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {response.responses.match.results.map(result => (
                  <ResultCard key={result.id} result={result} />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      )
      }