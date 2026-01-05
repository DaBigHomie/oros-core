'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Input, Textarea } from '../components/ui/input';

/**
 * Example Usage of DJ-Jaytek-Music UI Components
 * 
 * This file demonstrates how to use the Button, Card, and Input components
 * with the cyber-aesthetic design language.
 */

// Example icons (replace with your actual icon library)
const SearchIcon = () => <span>🔍</span>;
const UserIcon = () => <span>👤</span>;
const MailIcon = () => <span>✉️</span>;
const ArrowRightIcon = () => <span>→</span>;

export default function ComponentExamples() {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Validate email
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Form submitted successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            DJ-Jaytek-Music UI Components
          </h1>
          <p className="mt-2 text-gray-400">
            Cyber-aesthetic design with glassmorphism and neon glows
          </p>
        </div>

        {/* Button Examples */}
        <Card variant="glass" padding="lg">
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>
              Various button styles and states with neon glow effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Variants */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-300">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-300">Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>

              {/* States */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-gray-300">States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button isLoading>Loading...</Button>
                  <Button disabled>Disabled</Button>
                  <Button leftIcon={<UserIcon />}>With Icon</Button>
                  <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
                  <Button fullWidth variant="primary">Full Width Button</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Examples */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card variant="default">
            <CardHeader>
              <CardTitle as="h4">Default Card</CardTitle>
              <CardDescription>Subtle cyan glow on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                This is the default card variant with glassmorphism effects.
                Hover over it to see the neon glow.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Learn More</Button>
            </CardFooter>
          </Card>

          <Card variant="primary">
            <CardHeader>
              <CardTitle as="h4">Primary Card</CardTitle>
              <CardDescription>Cyan themed design</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-cyan-200">
                Primary variant with stronger cyan theming throughout.
              </p>
            </CardContent>
          </Card>

          <Card variant="secondary">
            <CardHeader>
              <CardTitle as="h4">Secondary Card</CardTitle>
              <CardDescription>Purple themed design</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-200">
                Secondary variant with purple cyber aesthetic.
              </p>
            </CardContent>
          </Card>

          <Card
            variant="glass"
            interactive
            onClick={() => alert('Card clicked!')}
            ariaLabel="Click to view interactive card demo"
          >
            <CardHeader>
              <CardTitle as="h4">Interactive Card</CardTitle>
              <CardDescription>Click me or press Enter</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                This card is fully interactive with keyboard navigation support.
              </p>
            </CardContent>
          </Card>

          <Card variant="success" padding="lg">
            <CardHeader>
              <CardTitle as="h4">Success Card</CardTitle>
              <CardDescription>Green themed for success states</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-200">
                Perfect for confirmation messages and success notifications.
              </p>
            </CardContent>
          </Card>

          <Card variant="danger" padding="lg">
            <CardHeader>
              <CardTitle as="h4">Danger Card</CardTitle>
              <CardDescription>Red themed for warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-200">
                Use for error states and destructive action confirmations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Input Examples */}
        <Card variant="glass" padding="lg">
          <CardHeader>
            <CardTitle>Input Components</CardTitle>
            <CardDescription>
              Form inputs with validation and accessibility features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Input */}
              <Input
                label="Username"
                placeholder="Enter your username"
                helperText="Choose a unique username"
                required
              />

              {/* Input with Icon */}
              <Input
                label="Search"
                placeholder="Search for tracks..."
                leftIcon={<SearchIcon />}
              />

              {/* Email with Validation */}
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                error={emailError}
                leftIcon={<MailIcon />}
                required
              />

              {/* Input Variants */}
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  variant="primary"
                  label="Primary Input"
                  placeholder="Cyan themed"
                />
                <Input
                  variant="secondary"
                  label="Secondary Input"
                  placeholder="Purple themed"
                />
              </div>

              {/* Textarea */}
              <Textarea
                label="Message"
                placeholder="Enter your message here..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                helperText={`${message.length} characters`}
              />

              {/* Input Sizes */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Input Sizes</h3>
                <Input inputSize="sm" placeholder="Small input" />
                <Input inputSize="md" placeholder="Medium input (default)" />
                <Input inputSize="lg" placeholder="Large input" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={!email || !message}
              >
                Submit Form
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setEmail('');
                  setMessage('');
                  setEmailError('');
                }}
              >
                Clear
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Combined Example - Login Card */}
        <Card variant="primary" padding="xl" className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>DJ Login</CardTitle>
            <CardDescription>
              Access your DJ dashboard with cyber-powered security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="dj@jaytek.music"
                leftIcon={<MailIcon />}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col gap-3">
              <Button fullWidth variant="primary" rightIcon={<ArrowRightIcon />}>
                Sign In
              </Button>
              <Button fullWidth variant="ghost">
                Forgot Password?
              </Button>
            </div>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
