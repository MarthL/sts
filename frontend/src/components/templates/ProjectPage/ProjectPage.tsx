import { useState, useEffect } from "react";
import { getProjectById } from "../../../api/projects";
import { useParams } from "react-router";
import { Project } from "../../../api/projects"
import { exportProjectPicture } from "../../../api/projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Star, Share2, Bookmark, CheckCircle2, ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage } from '@/components/ui/avatar';


export const ProjectPage: React.FC<any> = () => {

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  // };

  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project>();
  const [photo, setPhoto] = useState<any>('');

  useEffect(() => {
    if (id !== undefined) {
      getProjectById(parseInt(id)).then((res) => {
        setProject(res);
        if (res.photo_url) {
          exportProjectPicture(res.photo_url).then((url) => {
            setPhoto(url);
          })
        }
      })
    }
  }, [])
  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="border-b border-gray-800 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGoBack}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Button> */}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={project?.photo_url || "https://picsum.photos/500/300"}
            alt={project?.project_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between">
                <div>
                  {/* <div className="flex items-center space-x-3 mb-3">
                    <Badge className={`${statusColor[project.status]} border`}>
                      {project?.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {project?.category}
                    </Badge>
                  </div> */}
                  <h1 className="text-4xl font-bold mb-2">{project?.project_name}</h1>
                  <p className="text-xl text-gray-300 max-w-2xl">{project?.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Progress</div>
                  <div className="text-2xl font-bold">{project?.progress}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Info */}
              <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">{project?.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                      <Calendar className="h-6 w-6 text-[#9ACD32] mx-auto mb-2" />
                      <div className="text-sm text-gray-400">Start Date</div>
                      <div className="font-semibold text-white">{(project?.startDate?.getDate())}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                      <Clock className="h-6 w-6 text-[#9ACD32] mx-auto mb-2" />
                      <div className="text-sm text-gray-400">End Date</div>
                      <div className="font-semibold text-white">{(project?.endDate?.getDate())}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                      <MapPin className="h-6 w-6 text-[#9ACD32] mx-auto mb-2" />
                      <div className="text-sm text-gray-400">Location</div>
                      <div className="font-semibold text-white">{project?.location ?? "Paris"}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                      <Star className="h-6 w-6 text-[#9ACD32] mx-auto mb-2" />
                      <div className="text-sm text-gray-400">Budget</div>
                      <div className="font-semibold text-white">{project?.budget}</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Project Progress</span>
                      <span className="text-sm font-semibold text-white">{project?.progress}%</span>
                    </div>
                    <Progress value={project?.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="requirements" className="space-y-6">
                <TabsList className="bg-[#111111] border border-gray-800">
                  <TabsTrigger value="requirements" className="data-[state=active]:bg-[#9ACD32] data-[state=active]:text-black">
                    Requirements
                  </TabsTrigger>
                  <TabsTrigger value="benefits" className="data-[state=active]:bg-[#9ACD32] data-[state=active]:text-black">
                    Benefits
                  </TabsTrigger>
                  <TabsTrigger value="team" className="data-[state=active]:bg-[#9ACD32] data-[state=active]:text-black">
                    Team
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="requirements">
                  <Card className="bg-[#111111] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Requirements</CardTitle>
                      <CardDescription className="text-gray-400">
                        Skills and qualifications needed for this project
                      </CardDescription>
                    </CardHeader>
                    {/* <CardContent>
                      <ul className="space-y-3">
                        {project?.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle2 className="h-5 w-5 text-[#9ACD32] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent> */}
                  </Card>
                </TabsContent>

                <TabsContent value="benefits">
                  <Card className="bg-[#111111] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Benefits</CardTitle>
                      <CardDescription className="text-gray-400">
                        What you'll gain by joining this project
                      </CardDescription>
                    </CardHeader>
                    {/* <CardContent>
                      <ul className="space-y-3">
                        {project?.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Star className="h-5 w-5 text-[#9ACD32] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent> */}
                  </Card>
                </TabsContent>

                <TabsContent value="team">
                  <Card className="bg-[#111111] border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Team Members</CardTitle>
                      <CardDescription className="text-gray-400">
                        Meet the people working on this project
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project?.members?.map((member) => (
                          <div key={member.id} className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member?.profile_picture} alt={member?.username} />
                              {/* <AvatarFallback className="bg-[#9ACD32] text-black font-semibold">
                                {member.initials}
                              </AvatarFallback> */}
                            </Avatar>
                            <div>
                              <div className="font-semibold text-white">{member?.username}</div>
                              <div className="text-sm text-gray-400">{member?.job?.job_title}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Join Project Card */}
              <Card className="bg-[#111111] border-gray-800 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Users className="h-5 w-5 text-[#9ACD32]" />
                    <span>Join Project</span>
                  </CardTitle>
                </CardHeader>
                {/* <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Participants</span>
                    <span className="text-white font-semibold">
                      {project?.participants}/{project?.maxParticipants}
                    </span>
                  </div>
                  <Progress
                    value={(project.participants / project.maxParticipants) * 100}
                    className="h-2"
                  />

                  {project?.isJoined ? (
                    <div className="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 font-semibold">You're part of this project</span>
                    </div>
                  ) : (
                    <Button
                      onClick={handleJoinProject}
                      disabled={isJoining || project.participants >= project.maxParticipants}
                      className="w-full bg-[#9ACD32] hover:bg-[#8BC34A] text-black font-semibold"
                    >
                      {isJoining ? 'Joining...' : 'Join Project'}
                    </Button>
                  )}

                  <div className="text-xs text-gray-500 text-center">
                    {project?.maxParticipants - project.participants} spots remaining
                  </div>
                </CardContent> */}
              </Card>

              {/* Tags */}
              <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div className="flex flex-wrap gap-2">
                    {project?.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div> */}
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-[#111111] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Project Documentation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Company Website
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Project Timeline
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};