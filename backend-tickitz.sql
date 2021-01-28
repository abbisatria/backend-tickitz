-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 28 Jan 2021 pada 04.26
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend-tickitz`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cinemas`
--

CREATE TABLE `cinemas` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` text NOT NULL,
  `location` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `price` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `cinemas`
--

INSERT INTO `cinemas` (`id`, `name`, `image`, `location`, `address`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 'ebv.id', '1611669751007-ebv_id.png', 'Purwokerto', 'Whatever street No.12, South Purwokerto', 20, '2021-01-26 14:02:31', '2021-01-26 14:08:40'),
(2, 'CineOne21', '1611756740838-CineOne21.png', 'Purwokerto', 'Downcare street  No. 21, East Purwokerto', 10, '2021-01-27 14:12:20', '0000-00-00 00:00:00'),
(3, 'hiflix Cinema', '1611756775881-hiflix.png', 'Purwokerto', 'Colonel street No. 2, East Purwokerto', 10, '2021-01-27 14:12:55', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `genre`
--

INSERT INTO `genre` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Crime', '2021-01-20 05:43:52', '0000-00-00 00:00:00'),
(2, 'Drama', '2021-01-20 05:44:05', '0000-00-00 00:00:00'),
(3, 'Action', '2021-01-20 05:44:15', '0000-00-00 00:00:00'),
(4, 'Sci-Fi', '2021-01-20 05:44:26', '0000-00-00 00:00:00'),
(5, 'Thriller', '2021-01-20 05:44:34', '0000-00-00 00:00:00'),
(6, 'Adventure', '2021-01-20 05:44:46', '0000-00-00 00:00:00'),
(7, 'Animation', '2021-01-20 05:44:54', '0000-00-00 00:00:00'),
(8, 'Sport', '2021-01-20 05:45:11', '0000-00-00 00:00:00'),
(9, 'Family', '2021-01-20 05:45:22', '0000-00-00 00:00:00'),
(10, 'Comedy', '2021-01-20 05:45:30', '0000-00-00 00:00:00'),
(11, 'Horror', '2021-01-20 05:45:38', '0000-00-00 00:00:00'),
(12, 'War', '2021-01-20 05:45:54', '0000-00-00 00:00:00'),
(13, 'Fantasty', '2021-01-21 02:55:39', '2021-01-26 13:21:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `image` text NOT NULL,
  `releaseDate` date NOT NULL,
  `category` varchar(50) NOT NULL,
  `directed` varchar(100) NOT NULL,
  `duration` time NOT NULL,
  `casts` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `movies`
--

INSERT INTO `movies` (`id`, `name`, `image`, `releaseDate`, `category`, `directed`, `duration`, `casts`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Avengers: Endgame', '1611666829077-avengers.jpg', '2021-01-28', 'PG-13', 'Anthony Russo, Joe Russo', '03:01:00', 'Robert Downey Jr., Chris Evans, Mark Ruffalo', 'In the opening, Clint Barton is teaching his daughter archery on his secluded farm while his wife prepares a picnic lunch for them. Suddenly, Clint\'s daughter vanishes and the rest of Clint\'s family disintegrates, along with half of all life across the universe, the result of Thanos\' snapping his fingers after acquiring all six Infinity Stones. Nebula and Tony Stark are stranded in space following their defeat by Thanos on Titan, but are returned to Earth by Carol Danvers and reunited with Natasha Romanoff, Bruce Banner, Steve Rogers, Rocket, Thor, and James Rhodes. The team formulates a plan to steal the Infinity Stones back from Thanos and use them to reverse his actions, but learn upon finding him that he had used the stones a second time to destroy them, preventing their further use. He tells the remaining Avengers that he did so to avoid using the Stones for further nefarious purposes. Enraged, Thor cuts off Thanos\' head, saying it\'s what he should have done in Wakanda.', '2021-01-26 13:13:49', '2021-01-27 13:52:12'),
(2, 'Cherry', '1611666951383-cherry.jpg', '2021-02-26', 'PG-13', 'Anthony Russo, Joe Russo', '02:30:00', 'Tom Holland, Ciara Bravo, Jack Reynor', 'An Army medic suffering from post-traumatic stress disorder becomes a serial bank robber after an addiction to drugs puts him in debt.', '2021-01-26 13:15:51', '2021-01-27 13:52:15'),
(3, 'Tenet', '1611667128523-tenet.jpg', '2021-01-29', 'PG-13', 'Christopher Nolan', '02:30:00', 'John David Washington, Robert Pattinson, Elizabeth Debicki', 'In Kiev, Ukraine, an unnamed operative, aka The Protagonist, assists in a CIA assignment to foil an opera siege and retrieve a stolen cache of plutonium. During the operation, the plutonium is found to be fake but the Protagonist is saved by a masked gunman with a red string on his back. The Protagonist is then abducted and threatened with torture until he bites on an apparent suicide pill before revealing any information.', '2021-01-26 13:18:48', '2021-01-27 13:52:19'),
(4, 'Aladdin', '1611667299253-aladin.jpg', '2021-02-22', 'PG-13', 'Guy Ritchie', '02:08:00', 'Will Smith, Mena Massoud, Naomi Scott', 'Aladdin who regularly steals to get by with the aid of his pet monkey, Abu. One day while roaming the streets, Aladdin spots a beautiful girl who gets in trouble after giving away bread to children without paying. Aladdin comes to her rescue, and together they get chased by the Royal Guards. After a while they elude their pursuers, and Aladdin takes the girl to his place for some tea. The girl calls herself Dalia, and is the handmaiden to the Princess of Agrabah. She suddenly has to leave as another suitor for the princess, Prince Anders, arrives. Dalia happens to be Princess Jasmine and Dalia is the name of her handmaid and best friend. Meanwhile, The Sultan\'s trusted councilor, Jafar, is plotting to overthrown the Sultan by getting his hands on the Magic Lamp. However, it is hidden in a enchanted Cave of Wonders, and only the Diamond in the Rough may enter, which he is not. So, he spends weeks searching for this Diamond in the Rough.', '2021-01-26 13:21:39', '2021-01-27 13:52:22'),
(7, 'The Lion King', '1611760521035-lion_king.jpg', '2021-02-01', 'PG-13', 'Jon Favreau', '01:58:00', 'Donald Glover, Beyoncé, Seth Rogen', 'In the opening, Clint Barton is teaching his daughter archery on his secluded farm while his wife prepares a picnic lunch for them. Suddenly, Clint\'s daughter vanishes and the rest of Clint\'s family disintegrates, along with half of all life across the universe, the result of Thanos\' snapping his fingers after acquiring all six Infinity Stones. Nebula and Tony Stark are stranded in space following their defeat by Thanos on Titan, but are returned to Earth by Carol Danvers and reunited with Natasha Romanoff, Bruce Banner, Steve Rogers, Rocket, Thor, and James Rhodes. The team formulates a plan to steal the Infinity Stones back from Thanos and use them to reverse his actions, but learn upon finding him that he had used the stones a second time to destroy them, preventing their further use. He tells the remaining Avengers that he did so to avoid using the Stones for further nefarious purposes. Enraged, Thor cuts off Thanos\' head, saying it\'s what he should have done in Wakanda.', '2021-01-27 15:15:22', '0000-00-00 00:00:00'),
(8, 'John Wick: Chapter 3 - Parabellum', '1611760652135-john3wick.jpg', '2021-02-01', 'PG-13', 'Chad Stahelski', '02:10:00', 'Keanu Reeves, Halle Berry, Ian McShane', 'John runs through New York as time runs out on his \'grace period\'. He tuns into an alley and sees the Tick-Tock Man, one of the Bowery King\'s spies. He gets into a taxi, but the roads are gridlocked. With only twenty minutes until he is officially \'excommunicado\', he decides to get out and run again, but not before he gives the driver a gold coin to get his dog safely to the continental. He arrives at the Library and asks for a book, in which he reveals a hidden compartment containing some coins, a cross, a marker and a picture of him and his wife, which he kisses. A large man, Ernest, corners him in the bookshelves. John tells him he still has time left, but Ernest doesn\'t care: who is going to know about a few minutes? The two have a fight which culminates in John using the book to break Ernest\'s jaw and snap his neck. It leaves him with a bad stab wound on his shoulder, though. So, he visits the doctor at his home address, with only five minutes to go. The doc agrees to help, but has to stop stitching halfway through. The \'grace period\' is over.', '2021-01-27 15:17:34', '0000-00-00 00:00:00'),
(9, 'Spider-Man: Homecoming', '1611760742141-spiderman.jpg', '2021-02-01', 'PG-13', 'Jon Watts', '02:13:00', 'Tom Holland, Michael Keaton, Robert Downey Jr', 'The film opens in New York City the Avengers battled the Chitauri. Salvage worker Adrian Toomes (Michael Keaton) is showing his co-worker a drawing that his daughter made of the Avengers in action. They proceed to work on taking apart the Chitauri leviathan and gathering any tech they can get their hands on. Soon, a van from the U.S. Department of Damage Control arrives. Anne Marie Hoag (Tyne Daly) orders Toomes to shut down his operation, and adds that they will be confiscating all of their findings. Toomes protests and even punches a Damage Control agent when he makes a snide remark to him. Hoag then reasserts her demand to Toomes to give up his work.', '2021-01-27 15:19:04', '0000-00-00 00:00:00'),
(10, 'Joker', '1611760837728-joker.jpg', '2021-02-01', 'PG-13', 'Todd Phillips', '02:02:00', 'Joaquin Phoenix, Robert De Niro, Zazie Beetz', 'Arthur Fleck (Joaquin Phoenix) works as a clown-for-hire for a company called Ha-Ha\'s. He struggles with severe depression personally but finds some form of optimism in performing for others and trying to make people laugh. He is tasked with advertising a store by dancing and waving a sign around. On one such occasion, the sign gets snatched by a group of punk teens, forcing Arthur to chase them into an alley. They smash the sign against his face and proceed to mercilessly kick him while he\'s down.', '2021-01-27 15:20:39', '0000-00-00 00:00:00'),
(11, 'The Queen\'s Gambit', '1611760938017-queengambit.jpg', '2021-02-01', 'PG-13', 'Scott Frank, Allan Scott', '06:33:00', 'Anya Taylor-Joy, Chloe Pirrie, Bill Camp', 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.', '2021-01-27 15:22:19', '0000-00-00 00:00:00'),
(12, 'The Marksman', '1611761035448-marksman.jpg', '2021-02-01', 'PG-13', 'Robert Lorenz', '01:48:00', 'Katheryn Winnick, Liam Neeson, Teresa Ruiz', 'A rancher on the Arizona border becomes the unlikely defender of a young Mexican boy desperately fleeing the cartel assassins who\'ve pursued him into the U.S.', '2021-01-27 15:23:55', '0000-00-00 00:00:00'),
(13, 'The Marksman', 'null', '2021-02-01', 'PG-13', 'Robert Lorenz', '01:48:00', 'Katheryn Winnick, Liam Neeson, Teresa Ruiz', 'A rancher on the Arizona border becomes the unlikely defender of a young Mexican boy desperately fleeing the cartel assassins who\'ve pursued him into the U.S.', '2021-01-28 03:08:49', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `movie_genre`
--

CREATE TABLE `movie_genre` (
  `id` int(11) NOT NULL,
  `idMovie` int(11) NOT NULL,
  `idGenre` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `movie_genre`
--

INSERT INTO `movie_genre` (`id`, `idMovie`, `idGenre`, `createdAt`, `updatedAt`) VALUES
(98, 1, 2, '2021-01-26 13:13:49', '0000-00-00 00:00:00'),
(99, 1, 3, '2021-01-26 13:13:49', '0000-00-00 00:00:00'),
(100, 1, 6, '2021-01-26 13:13:49', '0000-00-00 00:00:00'),
(101, 2, 1, '2021-01-26 13:15:51', '0000-00-00 00:00:00'),
(102, 2, 2, '2021-01-26 13:15:51', '0000-00-00 00:00:00'),
(103, 3, 3, '2021-01-26 13:18:48', '0000-00-00 00:00:00'),
(104, 3, 4, '2021-01-26 13:18:48', '0000-00-00 00:00:00'),
(105, 3, 5, '2021-01-26 13:18:48', '0000-00-00 00:00:00'),
(106, 4, 6, '2021-01-26 13:21:39', '0000-00-00 00:00:00'),
(107, 4, 9, '2021-01-26 13:21:39', '0000-00-00 00:00:00'),
(108, 4, 13, '2021-01-26 13:21:39', '0000-00-00 00:00:00'),
(120, 7, 2, '2021-01-27 15:15:22', '0000-00-00 00:00:00'),
(121, 7, 3, '2021-01-27 15:15:22', '0000-00-00 00:00:00'),
(122, 7, 6, '2021-01-27 15:15:22', '0000-00-00 00:00:00'),
(123, 8, 1, '2021-01-27 15:17:34', '0000-00-00 00:00:00'),
(124, 8, 3, '2021-01-27 15:17:34', '0000-00-00 00:00:00'),
(125, 8, 5, '2021-01-27 15:17:34', '0000-00-00 00:00:00'),
(126, 9, 3, '2021-01-27 15:19:04', '0000-00-00 00:00:00'),
(127, 9, 4, '2021-01-27 15:19:04', '0000-00-00 00:00:00'),
(128, 9, 6, '2021-01-27 15:19:04', '0000-00-00 00:00:00'),
(129, 10, 1, '2021-01-27 15:20:39', '0000-00-00 00:00:00'),
(130, 10, 2, '2021-01-27 15:20:39', '0000-00-00 00:00:00'),
(131, 10, 5, '2021-01-27 15:20:39', '0000-00-00 00:00:00'),
(132, 11, 1, '2021-01-27 15:22:19', '0000-00-00 00:00:00'),
(133, 11, 8, '2021-01-27 15:22:19', '0000-00-00 00:00:00'),
(134, 12, 3, '2021-01-27 15:23:55', '0000-00-00 00:00:00'),
(135, 12, 5, '2021-01-27 15:23:55', '0000-00-00 00:00:00'),
(136, 13, 3, '2021-01-28 03:08:49', '0000-00-00 00:00:00'),
(137, 13, 5, '2021-01-28 03:08:49', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `idShowtime` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `seats`
--

INSERT INTO `seats` (`id`, `idShowtime`, `name`, `createdAt`, `updatedAt`) VALUES
(3, 49, 'F11, F12', '2021-01-28 02:54:08', '0000-00-00 00:00:00'),
(4, 49, 'A2', '2021-01-28 02:54:08', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `showtimes`
--

CREATE TABLE `showtimes` (
  `id` int(11) NOT NULL,
  `idCinema` int(11) NOT NULL,
  `idMovie` int(11) NOT NULL,
  `showtimeDate` date NOT NULL,
  `showtime` time NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `showtimes`
--

INSERT INTO `showtimes` (`id`, `idCinema`, `idMovie`, `showtimeDate`, `showtime`, `createdAt`, `updatedAt`) VALUES
(48, 2, 1, '2021-01-28', '09:30:00', '2021-01-27 15:09:17', '2021-01-28 03:02:07'),
(49, 2, 1, '2021-01-28', '10:30:00', '2021-01-27 15:09:17', '2021-01-28 03:02:07'),
(50, 2, 1, '2021-01-28', '12:30:00', '2021-01-27 15:09:31', '2021-01-28 03:02:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idMovie` int(11) NOT NULL,
  `idCinema` int(11) NOT NULL,
  `idShowtime` int(11) NOT NULL,
  `seats` varchar(100) NOT NULL,
  `ticketCount` int(11) NOT NULL,
  `totalPayment` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'abbisatria@gmail.com', '$2b$10$HZT.gZGQKBHtS.bi7zG/4ed9mUPtbRp5Tgik6iBCWjJgqGMdaborG', 1, 'active', '2021-01-26 13:09:17', '2021-01-26 13:09:39'),
(7, 'abbisatria98@gmail.com', '$2b$10$cDTFHcTOO93EERdCpBULneIjzicQqQb/22d/L13/ilnYxtIH8i66y', 2, 'pending', '2021-01-28 03:21:58', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_detail`
--

CREATE TABLE `user_detail` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_detail`
--

INSERT INTO `user_detail` (`id`, `idUser`, `firstname`, `lastname`, `phoneNumber`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 1, NULL, NULL, NULL, '', '2021-01-26 13:09:17', '0000-00-00 00:00:00'),
(3, 7, NULL, NULL, NULL, NULL, '2021-01-28 03:21:58', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cinemas`
--
ALTER TABLE `cinemas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_genre_ibfk_1` (`idMovie`),
  ADD KEY `movie_genre_ibfk_2` (`idGenre`);

--
-- Indeks untuk tabel `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idShowtime` (`idShowtime`);

--
-- Indeks untuk tabel `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCinema` (`idCinema`),
  ADD KEY `idMovie` (`idMovie`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMovie` (`idMovie`),
  ADD KEY `idCinema` (`idCinema`),
  ADD KEY `idShowtime` (`idShowtime`),
  ADD KEY `idUser` (`idUser`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cinemas`
--
ALTER TABLE `cinemas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `movie_genre`
--
ALTER TABLE `movie_genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT untuk tabel `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `movie_genre_ibfk_1` FOREIGN KEY (`idMovie`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `movie_genre_ibfk_2` FOREIGN KEY (`idGenre`) REFERENCES `genre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`idShowtime`) REFERENCES `showtimes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`idCinema`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `showtimes_ibfk_2` FOREIGN KEY (`idMovie`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`idMovie`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`idCinema`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`idShowtime`) REFERENCES `showtimes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_5` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_detail`
--
ALTER TABLE `user_detail`
  ADD CONSTRAINT `user_detail_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
