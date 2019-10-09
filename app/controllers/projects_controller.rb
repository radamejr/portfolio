class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.create(project_params)
    if @project.invalid?
      flash[:error] = '<strong>Could not save </strong> the data entered is invalid.'
    end
    redirect_to projects_path
  end

private

  def project_params
    params.require(:project).permit(:title, :description, :utilized)
  end
end
