import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, User, Clock, ImageIcon } from 'lucide-react';
import { Project } from '@/api/projects';
import { cn } from '@/lib/utils';

interface CardProjectProps {
  project: Project;
  onClick?: () => void;
}

export const CardProject: React.FC<CardProjectProps> = ({ project, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 bg-gradient-to-br dark:bg-[#111111] from-white to-gray-50/50 overflow-hidden"
      onClick={onClick}
    >
      {/* Image Preview Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:bg-[#111111]">
        <>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse dark:bg-[#111111]">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <img
            src={
              project?.photo_url
                ? project.photo_url
                : `https://picsum.photos/seed/${project.id}/400/300`
            }
            alt={project.project_name}
            className={cn(
              "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
              imageLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </>
        {/* <div className="absolute top-3 left-3">
          <div className={cn("w-3 h-3 rounded-full shadow-lg", project.color || 'bg-gray-300')} />
        </div> */}

        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className={cn("text-xs font-medium backdrop-blur-sm bg-white/90 dark:bg-[#111111]", getStatusColor(project.status))}
          >
            {project?.status && project?.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
          </Badge>
        </div>

        {/* Progress overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p- dark:bg-[#111111]">
          <div className="flex items-center justify-between text-white text-xs mb-1">
            <span>Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress
            value={project.progress}
            className="h-1.5 bg-white/20"
          />
        </div>
      </div>

      <CardHeader className="pb-3 dark:bg-[#111111]">
        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1 dark:text-white">
          {project?.project_name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 dark:bg-[#111111]">
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed dark:text-white">
          {project.description}
        </p>

        {/* <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs px-2 py-1 bg-white/50 hover:bg-white transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div> */}
      </CardContent>

      <CardFooter className="pt-0 pb-4 dark:bg-[#111111]">
        <div className="w-full space-y-2">
          <div className="flex items-center text-xs text-gray-500">
            <User className="w-3 h-3 mr-1.5" />
            <span>{project.author}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <CalendarDays className="w-3 h-3 mr-1.5" />
              <span>Created {project?.createdAt}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1.5" />
              <span>Updated {project.updatedAt}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};