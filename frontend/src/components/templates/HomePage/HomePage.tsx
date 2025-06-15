import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getProjects } from '@/api/projects';
import { ProjectModal } from '@/components/organisms/CreateProjectModal/CreateProjectModal';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ProjectsListHome } from '@/components/organisms/ProjectsListHome/ProjectsListHome';
import { Plus, Search, Filter, Briefcase } from 'lucide-react';
import { Project } from '@/api/projects';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/toaster';

export const HomePage = () => {
  const [projectsCollection, setProjectsCollection] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 12;

  const filteredProjects = projectsCollection.filter(project => {
    const matchesSearch = project?.project_name.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase())
    // ||
    // project?.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    getProjects().then(async (res) => {
      setProjectsCollection(res);
      setIsLoaded(true);
      setIsLoading(false);
    });

    // Get user name from localStorage or set default
    const storedName = localStorage.getItem('name') || 'User';
    setCurrentUser(storedName.charAt(0).toUpperCase() + storedName.slice(1));
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [search, statusFilter]);

  useEffect(() => {
    setIsLoading(true);
    if (search || statusFilter !== 'all') {
      getProjects(search).then((res) => {
        setProjectsCollection(res);
        setIsLoading(false);
      });
    } else {
      getProjects().then((res) => {
        setProjectsCollection(res);
        setIsLoading(false);
      });
    }
  }, [search, statusFilter]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleProjectCreated = (newProject: Project) => {
    setProjectsCollection(prev => [newProject, ...prev]);
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return projectsCollection.length;
    return projectsCollection.filter(p => p.status === status).length;
  };

  return (
    <div className="min-h-screen from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl dark:text-white">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold dark:text-white">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{currentUser}</span>
              </h1>
              <p className="text-gray-600 mt-1">Manage and track your projects with ease</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Button
              onClick={handleOpenModal}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create New Project
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{filteredProjects.length}</span>
              <span>of</span>
              <span className="font-medium">{projectsCollection.length}</span>
              <span>projects</span>
            </div>
          </div>
        </div>

        {/* Project Modal */}
        <ProjectModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          onProjectCreated={handleProjectCreated}
        />

        {/* Filters Section */}
        <Card className="mb-8 shadow-sm border-0 dark:bg-[#111111] backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold dark:text-white">Filters & Search</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium dark:bg-[#111111] dark:text-white">Search Projects</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                  <Input
                    placeholder="Search by title, description, or tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-white dark:dark:bg-[#111111] text-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dark:bg-[#111111] dark:text-white">Status Filter</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue className='dark:text-black' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      All Status ({getStatusCount('all')})
                    </SelectItem>
                    <SelectItem value="active">
                      Active ({getStatusCount('active')})
                    </SelectItem>
                    <SelectItem value="completed">
                      Completed ({getStatusCount('completed')})
                    </SelectItem>
                    <SelectItem value="on-hold">
                      On Hold ({getStatusCount('on-hold')})
                    </SelectItem>
                    <SelectItem value="archived">
                      Archived ({getStatusCount('archived')})
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium dark:bg-[#111111] dark:text-white">Quick Stats</label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {getStatusCount('active')} Active
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {getStatusCount('completed')} Done
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    {getStatusCount('on-hold')} On Hold
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <ProjectsListHome projects={currentProjects} />
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <Toaster />
    </div>
  );
};