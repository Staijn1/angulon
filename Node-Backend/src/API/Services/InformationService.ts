import { ModeInformation } from '../../Types/ModeInformation'
import * as fs from 'fs'
import path from 'path'
import { GradientInformation } from '../../Types/GradientInformation'

/**
 * A class that has access to information retrieved from assets
 */
export class InformationService {
  readonly assetsPath = path.join(__dirname, '..', '..', 'Assets')

  /**
   * Read a file with a certain filename in the assets folder
   * @param {string} file
   * @return {Promise<string>}
   * @async
   */
  async readJSON(file: string): Promise<string> {
    return fs.promises.readFile(path.join(this.assetsPath, file), 'utf-8')
  }

  /**
   * Get all modes saved in assets
   * @return {Promise<ModeInformation[]>}
   * @async
   */
  async getModes(): Promise<ModeInformation[]> {
    const modes = await this.readJSON('modes.json')
    return JSON.parse(modes)
  }

  /**
   * Read all gradients present for the visualizer
   */
  async getVisualizerGradients(): Promise<GradientInformation[]> {
    const gradients = await this.readJSON('gradients.json')
    return JSON.parse(gradients)
  }

  /**
   * Read all visualizer modes present for the visualizer
   */
  async getVisualizerModes(): Promise<ModeInformation[]> {
    const modes = await this.readJSON('visualizermodes.json')
    return JSON.parse(modes)
  }
}