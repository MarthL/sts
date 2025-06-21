import React, { useState } from 'react';
import { X, Search, User, DollarSign, Clock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: string;
  department: string;
  skills: string[];
  defaultTjm: number;
  availability: number; // percentage
  currentProjects: number;
}

interface AssignmentData {
  userId: string;
  pricingMode: 'tjm' | 'fixed';
  tjm?: number;
  hourlyRate?: number;
  fixedPrice?: number;
  occupationPercentage: number;
  startDate: string;
  endDate: string;
  role: string;
  notes: string;
}

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (assignment: AssignmentData) => void;
  projectTitle: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@company.com',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    initials: 'SL',
    role: 'Senior Developer',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Node.js', 'AI/ML'],
    defaultTjm: 650,
    availability: 80,
    currentProjects: 2
  },
  {
    id: '2',
    name: 'Alexandre Dubois',
    email: 'alexandre.dubois@company.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    initials: 'AD',
    role: 'DevOps Engineer',
    department: 'Infrastructure',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    defaultTjm: 600,
    availability: 100,
    currentProjects: 1
  },
  {
    id: '3',
    name: 'Camille Martin',
    email: 'camille.martin@company.com',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    initials: 'CM',
    role: 'UX Designer',
    department: 'Design',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    defaultTjm: 550,
    availability: 60,
    currentProjects: 3
  },
  {
    id: '4',
    name: 'Thomas Rousseau',
    email: 'thomas.rousseau@company.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    initials: 'TR',
    role: 'Product Manager',
    department: 'Product',
    skills: ['Strategy', 'Analytics', 'Agile', 'Stakeholder Management'],
    defaultTjm: 700,
    availability: 90,
    currentProjects: 2
  },
  {
    id: '5',
    name: 'Emma Leroy',
    email: 'emma.leroy@company.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    initials: 'EL',
    role: 'Data Scientist',
    department: 'Analytics',
    skills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization'],
    defaultTjm: 680,
    availability: 75,
    currentProjects: 1
  }
];

const projectRoles = [
  'Developer',
  'Senior Developer',
  'Tech Lead',
  'DevOps Engineer',
  'UX Designer',
  'UI Designer',
  'Product Manager',
  'Data Scientist',
  'QA Engineer',
  'Business Analyst'
];

export default function AssignmentModal({ isOpen, onClose, onAssign, projectTitle }: AssignmentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [assignmentData, setAssignmentData] = useState<Partial<AssignmentData>>({
    pricingMode: 'tjm',
    tjm: 0,
    hourlyRate: 0,
    fixedPrice: 0,
    occupationPercentage: 100,
    startDate: '',
    endDate: '',
    role: '',
    notes: ''
  });

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setAssignmentData(prev => ({
      ...prev,
      userId: user.id,
      tjm: user.defaultTjm,
      hourlyRate: Math.round(user.defaultTjm / 8), // Assuming 8 hours per day
      role: user.role
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAssign = () => {
    if (selectedUser && assignmentData.userId) {
      onAssign(assignmentData as AssignmentData);
      toast({
        title: "Assignation réussie",
        description: `${selectedUser.name} a été assigné(e) au projet ${projectTitle}`,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedUser(null);
    setSearchTerm('');
    setAssignmentData({
      pricingMode: 'tjm',
      tjm: 0,
      hourlyRate: 0,
      fixedPrice: 0,
      occupationPercentage: 100,
      startDate: '',
      endDate: '',
      role: '',
      notes: ''
    });
    onClose();
  };

  const updateAssignmentData = (field: keyof AssignmentData, value: any) => {
    setAssignmentData(prev => ({ ...prev, [field]: value }));

    // Auto-calculate hourly rate when TJM changes (only in TJM mode)
    if (field === 'tjm' && assignmentData.pricingMode === 'tjm') {
      setAssignmentData(prev => ({ ...prev, hourlyRate: Math.round(value / 8) }));
    }
    // Auto-calculate TJM when hourly rate changes (only in TJM mode)
    if (field === 'hourlyRate' && assignmentData.pricingMode === 'tjm') {
      setAssignmentData(prev => ({ ...prev, tjm: value * 8 }));
    }
  };

  const handlePricingModeChange = (mode: 'tjm' | 'fixed') => {
    setAssignmentData(prev => ({
      ...prev,
      pricingMode: mode,
      // Reset values when switching modes
      tjm: mode === 'tjm' ? (selectedUser?.defaultTjm || 0) : 0,
      hourlyRate: mode === 'tjm' ? Math.round((selectedUser?.defaultTjm || 0) / 8) : 0,
      fixedPrice: mode === 'fixed' ? 0 : 0
    }));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Sélectionner un utilisateur';
      case 2: return 'Configuration des taux';
      case 3: return 'Détails de l\'assignation';
      default: return '';
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return selectedUser !== null;
      case 2: {
        if (assignmentData.pricingMode === 'tjm') {
          return assignmentData.tjm && assignmentData.tjm > 0 && assignmentData.occupationPercentage && assignmentData.occupationPercentage > 0;
        } else {
          return assignmentData.fixedPrice && assignmentData.fixedPrice > 0;
        }
      }
      case 3: return assignmentData.startDate && assignmentData.endDate && assignmentData.role;
      default: return false;
    }
  };

  const calculateProjectDuration = () => {
    if (!assignmentData.startDate || !assignmentData.endDate) return 0;
    const start = new Date(assignmentData.startDate);
    const end = new Date(assignmentData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.round(diffDays / 7); // Convert to weeks
  };

  const calculateEstimatedCost = () => {
    if (assignmentData.pricingMode === 'fixed') {
      return assignmentData.fixedPrice || 0;
    } else {
      const weeks = calculateProjectDuration();
      const workingDaysPerWeek = 5;
      const totalWorkingDays = weeks * workingDaysPerWeek;
      const occupiedDays = (totalWorkingDays * (assignmentData.occupationPercentage || 0)) / 100;
      return Math.round(occupiedDays * (assignmentData.tjm || 0));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#111111] border-gray-800 text-white">
        <DialogHeader className="border-b border-gray-800 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-white">
                Assigner au projet: {projectTitle}
              </DialogTitle>
              <p className="text-sm text-gray-400 mt-1">{getStepTitle()}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === currentStep
                    ? 'bg-[#9ACD32] text-black'
                    : step < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                  {step < currentStep ? <CheckCircle2 className="h-4 w-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${step < currentStep ? 'bg-green-600' : 'bg-gray-700'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="py-6">
          {/* Step 1: User Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, email, rôle, département ou compétences..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className={`cursor-pointer transition-all duration-200 ${selectedUser?.id === user.id
                        ? 'bg-[#9ACD32]/20 border-[#9ACD32]'
                        : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                      }`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-[#9ACD32] text-black font-semibold">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-white truncate">{user.name}</h3>
                            {selectedUser?.id === user.id && (
                              <CheckCircle2 className="h-5 w-5 text-[#9ACD32] flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400 truncate">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {user.role}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {user.department}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                            <span>TJM: €{user.defaultTjm}</span>
                            <span>Dispo: {user.availability}%</span>
                            <span>{user.currentProjects} projets</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {user.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                                {skill}
                              </Badge>
                            ))}
                            {user.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                                +{user.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun utilisateur trouvé</p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Rate Configuration */}
          {currentStep === 2 && selectedUser && (
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <User className="h-5 w-5 text-[#9ACD32]" />
                    <span>Utilisateur sélectionné</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                      <AvatarFallback className="bg-[#9ACD32] text-black font-semibold text-lg">
                        {selectedUser.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedUser.name}</h3>
                      <p className="text-gray-400">{selectedUser.role} - {selectedUser.department}</p>
                      <p className="text-sm text-gray-500">TJM par défaut: €{selectedUser.defaultTjm}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Mode Selection */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-[#9ACD32]" />
                    <span>Mode de tarification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={assignmentData.pricingMode}
                    onValueChange={(value: 'tjm' | 'fixed') => handlePricingModeChange(value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tjm" id="tjm" />
                      <Label htmlFor="tjm" className="text-gray-300 cursor-pointer">
                        <div className="font-semibold">TJM (Taux Journalier Moyen)</div>
                        <div className="text-sm text-gray-500">Facturation au jour avec occupation variable</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed" className="text-gray-300 cursor-pointer">
                        <div className="font-semibold">Prix fixe</div>
                        <div className="text-sm text-gray-500">Montant forfaitaire pour toute la mission</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pricing Configuration */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-[#9ACD32]" />
                      <span>
                        {assignmentData.pricingMode === 'tjm' ? 'Configuration TJM' : 'Prix fixe'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignmentData.pricingMode === 'tjm' ? (
                      <>
                        <div>
                          <Label htmlFor="tjm" className="text-gray-300">TJM (Taux Journalier Moyen)</Label>
                          <Input
                            id="tjm"
                            type="number"
                            value={assignmentData.tjm || ''}
                            onChange={(e) => updateAssignmentData('tjm', parseInt(e.target.value) || 0)}
                            className="bg-gray-800 border-gray-600 text-white mt-1"
                            placeholder="650"
                          />
                          <p className="text-xs text-gray-500 mt-1">€ par jour</p>
                        </div>

                        <div>
                          <Label htmlFor="hourlyRate" className="text-gray-300">Taux horaire</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={assignmentData.hourlyRate || ''}
                            onChange={(e) => updateAssignmentData('hourlyRate', parseInt(e.target.value) || 0)}
                            className="bg-gray-800 border-gray-600 text-white mt-1"
                            placeholder="81"
                          />
                          <p className="text-xs text-gray-500 mt-1">€ par heure (basé sur 8h/jour)</p>
                        </div>
                      </>
                    ) : (
                      <div>
                        <Label htmlFor="fixedPrice" className="text-gray-300">Prix fixe total</Label>
                        <Input
                          id="fixedPrice"
                          type="number"
                          value={assignmentData.fixedPrice || ''}
                          onChange={(e) => updateAssignmentData('fixedPrice', parseInt(e.target.value) || 0)}
                          className="bg-gray-800 border-gray-600 text-white mt-1"
                          placeholder="25000"
                        />
                        <p className="text-xs text-gray-500 mt-1">€ pour toute la mission</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Occupation Configuration */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-[#9ACD32]" />
                      <span>
                        {assignmentData.pricingMode === 'tjm' ? 'Occupation' : 'Informations'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignmentData.pricingMode === 'tjm' && (
                      <>
                        <div>
                          <Label htmlFor="occupation" className="text-gray-300">% d'occupation sur le projet</Label>
                          <Input
                            id="occupation"
                            type="number"
                            min="1"
                            max="100"
                            value={assignmentData.occupationPercentage || ''}
                            onChange={(e) => updateAssignmentData('occupationPercentage', parseInt(e.target.value) || 0)}
                            className="bg-gray-800 border-gray-600 text-white mt-1"
                            placeholder="100"
                          />
                          <div className="mt-2">
                            <Progress value={assignmentData.occupationPercentage || 0} className="h-2" />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {assignmentData.occupationPercentage}% du temps complet
                          </p>
                        </div>

                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <h4 className="text-sm font-semibold text-white mb-2">Estimation mensuelle</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Jours/mois:</span>
                              <span className="text-white">
                                {Math.round((22 * (assignmentData.occupationPercentage || 0)) / 100)} jours
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Coût mensuel:</span>
                              <span className="text-white font-semibold">
                                €{Math.round(((assignmentData.tjm || 0) * 22 * (assignmentData.occupationPercentage || 0)) / 100).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {assignmentData.pricingMode === 'fixed' && (
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <h4 className="text-sm font-semibold text-white mb-2">Prix fixe</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Mode:</span>
                            <span className="text-white">Forfait</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Montant total:</span>
                            <span className="text-white font-semibold">
                              €{(assignmentData.fixedPrice || 0).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Le montant sera facturé selon les termes convenus (ex: 30% à la signature, 70% à la livraison)
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Assignment Details */}
          {currentStep === 3 && selectedUser && (
            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Détails de l'assignation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-gray-300">Date de début</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={assignmentData.startDate || ''}
                        onChange={(e) => updateAssignmentData('startDate', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="endDate" className="text-gray-300">Date de fin</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={assignmentData.endDate || ''}
                        onChange={(e) => updateAssignmentData('endDate', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="projectRole" className="text-gray-300">Rôle sur le projet</Label>
                    <Select
                      value={assignmentData.role || ''}
                      onValueChange={(value) => updateAssignmentData('role', value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-1">
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {projectRoles.map((role) => (
                          <SelectItem key={role} value={role} className="text-white hover:bg-gray-700">
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-gray-300">Notes (optionnel)</Label>
                    <textarea
                      id="notes"
                      value={assignmentData.notes || ''}
                      onChange={(e) => updateAssignmentData('notes', e.target.value)}
                      className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 resize-none"
                      rows={3}
                      placeholder="Informations complémentaires sur l'assignation..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="bg-[#9ACD32]/10 border-[#9ACD32]/30">
                <CardHeader>
                  <CardTitle className="text-white">Résumé de l'assignation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Utilisateur:</span>
                        <span className="text-white font-semibold">{selectedUser.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rôle:</span>
                        <span className="text-white">{assignmentData.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Mode:</span>
                        <span className="text-white">
                          {assignmentData.pricingMode === 'tjm' ? 'TJM' : 'Prix fixe'}
                        </span>
                      </div>
                      {assignmentData.pricingMode === 'tjm' && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Occupation:</span>
                          <span className="text-white">{assignmentData.occupationPercentage}%</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {assignmentData.pricingMode === 'tjm' ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">TJM:</span>
                            <span className="text-white font-semibold">€{assignmentData.tjm}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Taux horaire:</span>
                            <span className="text-white">€{assignmentData.hourlyRate}/h</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Prix fixe:</span>
                          <span className="text-white font-semibold">€{assignmentData.fixedPrice?.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-400">Période:</span>
                        <span className="text-white">
                          {assignmentData.startDate} → {assignmentData.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Coût estimé:</span>
                        <span className="text-white font-bold text-[#9ACD32]">
                          €{calculateEstimatedCost().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-4 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Étape {currentStep} sur 3
          </div>
          <div className="flex items-center space-x-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Précédent
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className="bg-[#9ACD32] hover:bg-[#8BC34A] text-black font-semibold"
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleAssign}
                disabled={!canProceedToNext()}
                className="bg-[#9ACD32] hover:bg-[#8BC34A] text-black font-semibold"
              >
                Assigner au projet
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}