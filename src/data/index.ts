import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

function loadYaml<T>(filename: string): T {
  return yaml.load(readFileSync(join(process.cwd(), '_data', filename), 'utf8')) as T;
}

function loadJson<T>(filename: string): T {
  return JSON.parse(readFileSync(join(process.cwd(), '_data', filename), 'utf8')) as T;
}

export interface SiteConfig {
  info: { title: string; short_bio: string; email: string };
  settings: { construction_text: string };
  categories: string[];
}

export interface NavItem {
  name: string;
  link: string;
  visibility: boolean;
  categories?: Array<{ name: string; link: string; visibility: boolean }>;
}

export interface Navigation {
  items: NavItem[];
}

export interface AboutData {
  photo?: string;
  top_left?: string;
  top_right?: string;
  main?: string;
}

export const siteConfig = loadYaml<SiteConfig>('site_config.yml');
export const navigation = loadYaml<Navigation>('navigation.yml');
export const about = loadYaml<AboutData>('about.yml');
export const tags = loadJson<string[]>('tags.json');

export const workOrder: string[] = JSON.parse(
  readFileSync(join(process.cwd(), 'src/content/works/_order.json'), 'utf8')
);
