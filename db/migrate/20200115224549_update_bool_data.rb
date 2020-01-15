class UpdateBoolData < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :viewable_heroku, :boolean, :default => true
    
  end
end
