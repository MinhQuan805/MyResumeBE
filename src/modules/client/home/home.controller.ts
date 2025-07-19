import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { prefixApi } from '../../../config/system';

@Controller(prefixApi + '/home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async index() {
    return this.homeService.index();
  }
}
