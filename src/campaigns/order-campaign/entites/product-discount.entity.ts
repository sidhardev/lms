import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { campaign } from "./discount-campaign.entity";

@Entity('product-discount')

export class ProductDiscount {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column({
    
            nullable: true
        })
        discountPercent: number;
    
      
    
        @Column({nullable: true})
        discountAmount: number;
    
        @Column()
        minOrderValue: number;
    
        @Column() 
        maxDiscount: number;
    
     
    
        @ManyToOne(()=> campaign, (campaign) => campaign.productDiscount)
        discountCampaign: campaign;
    
    



}

