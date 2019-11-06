class AlterProjectAddRowOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :row_order, :integer
    add_index :projects, :row_order
  end
end
