import { users, devices, type User, type Device, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;
  getDevice(userId: number, deviceId: string): Promise<Device | undefined>;
  createDevice(device: Omit<Device, "id">): Promise<Device>;
  updateDevice(id: number, updates: Partial<Device>): Promise<Device>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private devices: Map<number, Device>;
  private currentUserId: number;
  private currentDeviceId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.devices = new Map();
    this.currentUserId = 1;
    this.currentDeviceId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      faceVerified: false,
      gestureVerified: false,
      encryptionKey: null,
      lastLoginLocation: null,
      lastLoginTime: null,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error("User not found");
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getDevice(userId: number, deviceId: string): Promise<Device | undefined> {
    return Array.from(this.devices.values()).find(
      (device) => device.userId === userId && device.deviceId === deviceId,
    );
  }

  async createDevice(device: Omit<Device, "id">): Promise<Device> {
    const id = this.currentDeviceId++;
    const newDevice = { ...device, id };
    this.devices.set(id, newDevice);
    return newDevice;
  }

  async updateDevice(id: number, updates: Partial<Device>): Promise<Device> {
    const device = this.devices.get(id);
    if (!device) throw new Error("Device not found");
    const updatedDevice = { ...device, ...updates };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }
}

export const storage = new MemStorage();
