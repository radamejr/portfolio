class ProjectsController < ApplicationController
  def index
    @project = Project.first
  end
end
