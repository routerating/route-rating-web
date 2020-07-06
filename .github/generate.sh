#!/usr/bin/env ruby

require "yaml"
require "json"

yaml = YAML.load_file(File.expand_path("ci-template.yml", __dir__))

File.write(File.expand_path("workflows/ci.yml", __dir__), YAML.load(yaml.to_json).to_yaml(line_width: 1024))

puts "Workflow emitted!"