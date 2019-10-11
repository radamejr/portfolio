class AddUrlForGitToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :git_url, :string
  end
end
