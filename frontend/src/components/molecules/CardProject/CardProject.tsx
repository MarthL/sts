import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, User, Clock } from 'lucide-react';
import { Project } from '@/api/projects';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CardProjectProps {
  project: Project;
  onClick?: () => void;
}

export const CardProject: React.FC<CardProjectProps> = ({ project, onClick }) => {
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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Link to={`/project/${project?.id}`}>
      <Card
        className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 from-white to-gray-50/50 dark:bg-[#111111]"
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className={cn("w-1 h-12 rounded-full mr-4", 'bg-gray-300')} />
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 ease-in-out">
                {project?.project_name}
              </CardTitle>
              <Badge
                variant="secondary"
                className={cn("mt-2 text-xs font-medium", getStatusColor(project?.status))}
              >
                {project?.status && project?.status?.charAt(0).toUpperCase() + project?.status?.slice(1).replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {project?.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Progress</span>
              <span className="font-medium">{project?.progress}%</span>
            </div>
            <Progress
              value={project?.progress}
              className="h-2"
            />
          </div>

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

        <CardFooter className="pt-0 pb-4">
          <div className="w-full space-y-2">
            <div className="flex items-center text-xs text-gray-500">
              <User className="w-3 h-3 mr-1.5" />
              <span>{project?.author}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <CalendarDays className="w-3 h-3 mr-1.5" />
                <span>Created {(project?.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1.5" />
                <span>Updated {(project?.updatedAt)}</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};