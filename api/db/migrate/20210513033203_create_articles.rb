class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title ,unique: true
      t.string :newsorg
      t.string :pubtime
      t.string :link
      t.string :date
      t.timestamps
      add_index :models, [:name, :year, :trim], unique: true, name: 'index_unique_models' 
    end
  end
end
