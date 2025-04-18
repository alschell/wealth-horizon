
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUnifiedForm } from '@/hooks/form/useUnifiedForm';

export const ResumeUploadModal = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useUnifiedForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      additionalInfo: '',
    },
    onSubmit: async (data) => {
      console.log('Form Data:', data);
      console.log('File:', file);

      toast({
        title: "Success",
        description: "Your application has been submitted!",
      });
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {values && (
          <>
            <input
              type="text"
              value={values.name}
              onChange={handleChange}
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              value={values.email}
              onChange={handleChange}
              name="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              value={values.phone}
              onChange={handleChange}
              name="phone"
              placeholder="Your Phone"
              className="w-full p-2 border rounded"
            />
            <input
              type="url"
              value={values.linkedin}
              onChange={handleChange}
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              className="w-full p-2 border rounded"
            />
            <Textarea
              value={values.additionalInfo}
              onChange={handleChange}
              name="additionalInfo"
              placeholder="Additional Information"
              className="w-full p-2 border rounded"
            />
          </>
        )}
        <div {...getRootProps()} className="dropzone w-full p-4 border-2 border-dashed rounded cursor-pointer">
          <input {...getInputProps()} />
          <p>Drag 'n' drop your resume here, or click to select files</p>
          {file && <p>Selected file: {file.name}</p>}
        </div>
        <Button type="submit" className="w-full">Submit Application</Button>
      </div>
    </form>
  );
};
