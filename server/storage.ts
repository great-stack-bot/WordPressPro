import { posts, comments, subscribers, type Post, type Comment, type Subscriber, type InsertPost, type InsertComment, type InsertSubscriber } from "@shared/schema";

export interface IStorage {
  // Posts
  getPosts(): Promise<Post[]>;
  getPostsByCategory(category: string): Promise<Post[]>;
  getFeaturedPosts(): Promise<Post[]>;
  searchPosts(query: string): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Comments
  getCommentsByPostId(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Subscribers
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

export class MemStorage implements IStorage {
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private subscribers: Map<number, Subscriber>;
  private currentPostId: number;
  private currentCommentId: number;
  private currentSubscriberId: number;

  constructor() {
    this.posts = new Map();
    this.comments = new Map();
    this.subscribers = new Map();
    this.currentPostId = 1;
    this.currentCommentId = 1;
    this.currentSubscriberId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed sample posts
    const samplePosts: InsertPost[] = [
      {
        title: "Building Custom WordPress Themes with Modern Tools",
        excerpt: "Learn how to create modern, responsive WordPress themes using the latest development tools and best practices. This comprehensive guide covers everything from setup to deployment.",
        content: "Full article content would go here...",
        category: "Theme Development",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        authorName: "John Smith",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
        publishDate: "Dec 15, 2023",
        readTime: "5 min read",
        featured: true,
      },
      {
        title: "Advanced Plugin Architecture Patterns",
        excerpt: "Explore sophisticated design patterns for building scalable WordPress plugins. Learn about dependency injection, service containers, and clean architecture principles.",
        content: "Full article content would go here...",
        category: "Plugin Development",
        imageUrl: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        authorName: "Sarah Wilson",
        authorAvatar: "https://pixabay.com/get/g6fea35d42b27098e2646f6e3e1cc546929edf532ee721f027158e12c005353a8abaa9edbd72892b1ea4bbfe989cb5651fda95d6440fd23c28ca6854f5bb04c90_1280.jpg",
        publishDate: "Dec 12, 2023",
        readTime: "8 min read",
        featured: true,
      },
      {
        title: "WordPress Performance Optimization Guide",
        excerpt: "Master the art of WordPress performance optimization. From database queries to caching strategies, learn how to make your sites lightning fast.",
        content: "Full article content would go here...",
        category: "Performance",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        authorName: "Mike Chen",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
        publishDate: "Dec 10, 2023",
        readTime: "6 min read",
        featured: true,
      },
      {
        title: "Custom Post Types Best Practices",
        excerpt: "Learn how to create and manage custom post types effectively in your WordPress themes.",
        content: "Full article content would go here...",
        category: "Theme Development",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        authorName: "John Smith",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
        publishDate: "Dec 8, 2023",
        readTime: "4 min read",
        featured: false,
      },
      {
        title: "WordPress Hooks Deep Dive",
        excerpt: "Master WordPress actions and filters to build powerful and flexible plugins.",
        content: "Full article content would go here...",
        category: "Plugin Development",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        authorName: "Sarah Wilson",
        authorAvatar: "https://pixabay.com/get/g6fea35d42b27098e2646f6e3e1cc546929edf532ee721f027158e12c005353a8abaa9edbd72892b1ea4bbfe989cb5651fda95d6440fd23c28ca6854f5bb04c90_1280.jpg",
        publishDate: "Dec 6, 2023",
        readTime: "7 min read",
        featured: false,
      },
      {
        title: "WordPress Security Hardening",
        excerpt: "Essential security practices to protect your WordPress sites from common vulnerabilities.",
        content: "Full article content would go here...",
        category: "Security",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        authorName: "Mike Chen",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
        publishDate: "Dec 4, 2023",
        readTime: "6 min read",
        featured: false,
      }
    ];

    samplePosts.forEach(post => {
      this.createPost(post);
    });

    // Seed sample comments
    const sampleComments: InsertComment[] = [
      {
        postId: 1,
        authorName: "Alex Rodriguez",
        authorEmail: "alex@example.com",
        content: "Great article! I've been struggling with custom post types and this tutorial really helped clarify the best practices. The code examples are particularly useful.",
      },
      {
        postId: 1,
        authorName: "Jennifer Kim",
        authorEmail: "jennifer@example.com",
        content: "I'd love to see a follow-up article on handling custom fields with these post types. Thanks for sharing your expertise!",
      }
    ];

    sampleComments.forEach(comment => {
      this.createComment(comment);
    });
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.category === category)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async getFeaturedPosts(): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.featured)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async searchPosts(query: string): Promise<Post[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.posts.values())
      .filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.category.toLowerCase().includes(lowercaseQuery)
      )
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const post: Post = { 
      ...insertPost, 
      id,
      featured: insertPost.featured ?? false
    };
    this.posts.set(id, post);
    return post;
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = {
      ...insertComment,
      id,
      postId: insertComment.postId ?? null,
      authorAvatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1527980965255-d3b416303d12' : '1438761681033-6461ffad8d80'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60`,
      publishDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
    };
    this.comments.set(id, comment);
    return comment;
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const subscriber: Subscriber = {
      ...insertSubscriber,
      id,
      subscribedAt: new Date().toISOString(),
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      subscriber => subscriber.email === email
    );
  }
}

export const storage = new MemStorage();
