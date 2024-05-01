import java.util.Scanner;

class Test {
         float balance;
         int PIN ;
// example of constructor for checkedpin function
         Test(int PIN)
         {            
            this.PIN = PIN;
            System.out.println("Constructor Called");
          System.out.println("Enter your pin");
         @SuppressWarnings("resource")
        Scanner s = new Scanner(System.in);
         int enteredpin = s.nextInt();
         if (enteredpin==0) 
         {
          System.out.println("Invalid pin");
         }
           else
           {
            System.out.println("Welcome! Start Banking");
           }
               menu();
         }

         public void menu()
         {
            System.out.println("1.Balance");
            System.out.println("2.Withdraw Money");
            System.out.println("3.Deposit Money");
            System.out.println("4.Exit");    
               

            @SuppressWarnings("resource")
            Scanner s = new Scanner(System.in);
            int choice = s.nextInt();

            if (choice==1) 
            {
               Balance();
            }

            else if (choice==2) 
            {
               Withdrawmoney();
            }

           else if (choice==3) 
           {
               Depositmoney();
           }
            
           
           else if(choice==4)
           {
            return;
            }

            else
            {
               System.out.println("Enter a valid choice");
            }
         
         }

         public void Balance()
         {
          System.out.println("Your Balance is :"+balance);
          menu();
         }

         public void Withdrawmoney()
         {
           System.out.println("Enter the amount you want to withdraw");
           @SuppressWarnings("resource")
            Scanner s = new Scanner(System.in);
            float amount = s.nextFloat();
            if (amount>balance) {
            System.out.println("Insufficient Balance");  
            }
            else{
            balance = balance-amount;
            System.out.println("Money Withdrawl Successfull");
           }
           menu();
         }

         @SuppressWarnings("resource")
        public void Depositmoney()
         {
            System.out.println("Enter the amount to Deposit");
            Scanner s = new Scanner(System.in);
            float amount = s.nextFloat();
            balance = balance+amount;
            System.out.println("Money Deposited Successfully");
            menu();
         }
         
         public static void main(String[] args) 
         {
            @SuppressWarnings("unused")
            Test t = new Test(5674);
            
         }
}
