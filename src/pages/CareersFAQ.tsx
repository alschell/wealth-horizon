
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { FadeIn } from '@/components/ui/animation';

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What is the hiring process at WealthHorizon?",
    answer: "Our hiring process typically includes an initial resume screening, a phone interview, one or more technical assessments relevant to the role, and final interviews with the team and leadership. The entire process usually takes 2-4 weeks, depending on the position."
  },
  {
    question: "Do you offer remote work opportunities?",
    answer: "Yes, we offer both remote and hybrid work options for many positions. The specific arrangement depends on the role and team needs. We believe in providing flexibility while maintaining strong collaboration."
  },
  {
    question: "What benefits do you offer employees?",
    answer: "We offer a comprehensive benefits package including health insurance, 401(k) matching, generous paid time off, professional development stipends, wellness programs, and equity options. We're committed to supporting our employees' wellbeing and growth."
  },
  {
    question: "How would you describe your company culture?",
    answer: "Our culture is collaborative, innovative, and focused on excellence. We value diverse perspectives, continuous learning, and a healthy work-life balance. We encourage open communication and provide autonomy while maintaining high standards."
  },
  {
    question: "Do you have internship or entry-level positions?",
    answer: "Yes, we regularly offer internships and entry-level positions across various departments. We're committed to developing early-career talent and providing meaningful growth opportunities."
  },
  {
    question: "What growth opportunities are available at WealthHorizon?",
    answer: "We invest in our employees' growth through mentorship, training programs, cross-functional projects, and clear advancement paths. We regularly promote from within and encourage employees to develop new skills."
  },
  {
    question: "How do I apply for a position if I don't see a relevant job posting?",
    answer: "We encourage you to submit your resume for general consideration through our careers page. We're always looking for exceptional talent, even when we don't have specific openings listed."
  },
  {
    question: "What makes WealthHorizon different from other fintech companies?",
    answer: "WealthHorizon stands out with our AI-native platform, focus on family offices and institutions, and our commitment to innovation. We combine cutting-edge technology with deep industry expertise and a client-first approach."
  }
];

const CareersFAQ: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/careers" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ChevronLeft size={20} />
          <span className="ml-1">Back to Careers</span>
        </Link>
        
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Careers FAQ</h1>
            <p className="text-xl text-gray-600">
              Find answers to commonly asked questions about careers at WealthHorizon.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {faqItems.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-gray-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-base">{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
        
        <Separator className="my-12" />
        
        <FadeIn delay={0.3}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Have more questions?</h2>
            <p className="text-gray-600 mb-6">
              We'd love to hear from you. Contact our recruiting team for any additional questions.
            </p>
            <Link 
              to="/careers" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800"
            >
              View Open Positions
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default CareersFAQ;
