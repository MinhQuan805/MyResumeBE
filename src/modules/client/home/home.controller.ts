import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { prefixApi } from '../../../config/system';
import { Public } from 'src/modules/decorator/customize';

@Controller(prefixApi)
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Public()
  @Get()
  async index() {
    return this.homeService.index();
  }
}
