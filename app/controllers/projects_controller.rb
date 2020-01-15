class ProjectsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :update, :order]
  

  

  def index
    @projects = Project.all
    @project = Project.new
  end

  def new
    if current_user.admin?
      @project = Project.new
    end
  end

  
  def edit
    if current_user.admin?
      @project = Project.find(params[:id])
    end
  end

  def destroy
    if current_user.admin?
      @project = Project.find(params[:id])
      @project.destroy
      redirect_to projects_path
    end
  end

  def order
    if current_user.admin?
      @project = Project.find(params[:id])
      @project.update_attributes(project_params)
      render plain: 'updated!'
    end
  end

  def update
    if current_user.admin?
      @project = Project.find(params[:id])
      @project.update_attributes(project_params)
      redirect_to projects_path
    end
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
    params.require(:project).permit(:title, :description, :utilized, :preview, :url, :git_url, :row_order_position, :viewable_heroku)
  end
end
