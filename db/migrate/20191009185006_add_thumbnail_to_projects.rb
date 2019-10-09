class AddThumbnailToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :preview, :string
  end
end
