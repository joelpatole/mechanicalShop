import { status } from "./constant";

class OrderStatusHelper
{
    convertStringToEnumValue(orderStatus: any): status {  
        if(orderStatus === "pending")
            return status.pending;
        else if(orderStatus === "approved")
           return status.approved;
        else if(orderStatus === "rejected")
            return status.rejected;
        else
            return status.unknown; 
    } 

    convertEnumValueToString(orderStatus: Number | String): string {  
        if(orderStatus === status.pending)
            return "pending";
        else if(orderStatus === status.approved)
           return "approved";
        else if(orderStatus === status.rejected)
            return "rejected";
        else
            return "unknown"; 
    }
}

export const orderStatusHelper = new OrderStatusHelper(); 