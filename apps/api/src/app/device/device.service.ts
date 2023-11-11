import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Device} from './Device.model';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {DAOService} from '../interfaces/DAOService';

@Injectable()
export class DeviceService implements DAOService<Device> {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {
  }

  async findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  async findOne(ipAddress: string): Promise<Device> {
    return this.deviceRepository.findOne({where: {ipAddress: ipAddress}});
  }

  async create(deviceData: Partial<Device>): Promise<Device> {
    const device = this.deviceRepository.create(deviceData);
    return this.deviceRepository.save(device);
  }

  async update(ipAddress: string, deviceData: Partial<Device>): Promise<UpdateResult> {
    return this.deviceRepository.update({ipAddress: ipAddress}, deviceData);
  }

  async remove(ipAddress: string): Promise<DeleteResult> {
    return this.deviceRepository.delete({ipAddress: ipAddress});
  }

  /**
   * Add a device if it does not exist yet
   * @param remoteAddress
   * @param entity
   * @returns True if the device was added, false if it already existed
   */
  async addIfNotExists(remoteAddress: string, entity: Partial<Device>): Promise<boolean> {
    const existingDevice = await this.findOne(remoteAddress);
    if (existingDevice) return false;

    const deviceInfo = {
      ...entity,
      ipAddress: remoteAddress,
    }
    await this.create(deviceInfo);
    return true;
  }
}

