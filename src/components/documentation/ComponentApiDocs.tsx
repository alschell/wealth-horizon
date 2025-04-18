
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code } from '@/components/ui/code';

interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface MethodDefinition {
  name: string;
  params: string;
  returnType: string;
  description: string;
}

interface ComponentApiDocsProps {
  name: string;
  description: string;
  usage: string;
  props?: PropDefinition[];
  methods?: MethodDefinition[];
  notes?: string[];
  examples?: Array<{
    title: string;
    code: string;
    description?: string;
  }>;
}

export const ComponentApiDocs: React.FC<ComponentApiDocsProps> = ({
  name,
  description,
  usage,
  props = [],
  methods = [],
  notes = [],
  examples = [],
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{name}</CardTitle>
            <Badge variant="outline" className="ml-2">
              Component
            </Badge>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Basic Usage</h3>
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <pre className="text-sm overflow-auto p-2">
                    <code>{usage}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="props" className="mt-6">
              <TabsList>
                <TabsTrigger value="props">Props</TabsTrigger>
                {methods.length > 0 && <TabsTrigger value="methods">Methods</TabsTrigger>}
                {examples.length > 0 && <TabsTrigger value="examples">Examples</TabsTrigger>}
                {notes.length > 0 && <TabsTrigger value="notes">Notes</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="props" className="mt-4">
                {props.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {props.map((prop) => (
                        <TableRow key={prop.name}>
                          <TableCell className="font-medium">
                            {prop.name}
                            {prop.required && <span className="text-red-500 ml-1">*</span>}
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {prop.type}
                            </code>
                          </TableCell>
                          <TableCell>
                            {prop.default ? (
                              <code className="text-xs">{prop.default}</code>
                            ) : (
                              <span className="text-muted-foreground text-xs">—</span>
                            )}
                          </TableCell>
                          <TableCell>{prop.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No props available for this component.</p>
                )}
              </TabsContent>
              
              {methods.length > 0 && (
                <TabsContent value="methods" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Parameters</TableHead>
                        <TableHead>Return Type</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {methods.map((method) => (
                        <TableRow key={method.name}>
                          <TableCell className="font-medium">{method.name}</TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {method.params}
                            </code>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                              {method.returnType}
                            </code>
                          </TableCell>
                          <TableCell>{method.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              )}
              
              {examples.length > 0 && (
                <TabsContent value="examples" className="mt-4 space-y-6">
                  {examples.map((example, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-semibold">{example.title}</h3>
                      {example.description && <p className="text-muted-foreground mb-2">{example.description}</p>}
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <pre className="text-sm overflow-auto p-2">
                            <code>{example.code}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </TabsContent>
              )}
              
              {notes.length > 0 && (
                <TabsContent value="notes" className="mt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Implementation Notes</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {notes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentApiDocs;
