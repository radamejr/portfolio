class ProjectsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :update]


  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
  end

  def show
    @project = Project.find(params[:id])
  end

  def edit
    @project = Project.find(params[:id])
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    redirect_to root_path
  end

  def update
    @project = Project.find(params[:id])
    @project.update_attributes(project_params)
    redirect_to project_path(@project)
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
