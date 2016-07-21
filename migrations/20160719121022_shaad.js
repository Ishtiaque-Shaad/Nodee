exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('videos', function(table){
      table.increments('id').primary();
      table.string('video_id');
      table.string('user_id');
      table.string('url');
      table.string('upload');
      table.string('title');
      table.string('desc');
      table.string('event_id');
      table.string('place_id');
      table.string('lat');
      table.string('lng');
      table.string('thumbnail_url');
      table.timestamps();
    }).createTable('votes', function(table) {
      table.increments('id').primary();
      table.string('video_id');
      table.string('user_id');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('videos').dropTable('vote'),
  ]);
};